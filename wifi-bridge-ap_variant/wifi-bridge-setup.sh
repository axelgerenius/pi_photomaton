#!/bin/bash

# ############################################################################
# Author: 		Matthieu Holtz
# Year:   		2017
# Project: 		wifi bridge
# Description: 	        This is the wifi Managed (or client) mode script
# ############################################################################


my_dir="$(dirname "$0")"
timestamp=`date`

source "$my_dir/wifi-helpers"

echo "Use config file from $my_dir"
cp "$my_dir/wifi-bridge.config" "/tmp/wifi-bridge.config"

DHCPD_LOG_FILE=$(cat /tmp/wifi-bridge-log-path)

source /tmp/wifi-bridge.config

KillProcess

HOSTAPD_CONF="/tmp/wpa_supplicant.conf"
ICS_DHCP_CONF="/tmp/dhcpd.conf"

# Generate hostapd file :

echo "ctrl_interface=/var/run/hostapd" > "$HOSTAPD_CONF"
echo "driver=$AP_HOSTAPD_DRIVER" >> "$HOSTAPD_CONF"
echo "ieee80211n=1" >> "$HOSTAPD_CONF"
echo "ctrl_interface_group=0" >> "$HOSTAPD_CONF"
echo "beacon_int=100" >> "$HOSTAPD_CONF"
echo "interface=$WLAN_IFACE_NAME" >> "$HOSTAPD_CONF"
echo "ssid=$AP_SSID" >> "$HOSTAPD_CONF"
echo "hw_mode=g" >> "$HOSTAPD_CONF"
echo "channel=$AP_CHANNEL" >> "$HOSTAPD_CONF"
echo "auth_algs=1" >> "$HOSTAPD_CONF"
echo "wmm_enabled=1" >> "$HOSTAPD_CONF"
echo "eap_reauth_period=360000000" >> "$HOSTAPD_CONF"
echo "macaddr_acl=0" >> "$HOSTAPD_CONF"
echo "ignore_broadcast_ssid=0" >> "$HOSTAPD_CONF"
echo "wpa=2" >> "$HOSTAPD_CONF"
echo "wpa_passphrase=$AP_WPA_PASSPHRASE" >> "$HOSTAPD_CONF"
echo "wpa_key_mgmt=WPA-PSK" >> "$HOSTAPD_CONF"
echo "wpa_pairwise=TKIP" >> "$HOSTAPD_CONF"
echo "rsn_pairwise=CCMP" >> "$HOSTAPD_CONF"

sed -i '1s/^/# Generated on '"$timestamp"'\n/' "$HOSTAPD_CONF"

EchoStatus $? "Generate $HOSTAPD_CONF for SSID $AP_SSID on $WLAN_IFACE_NAME"

# Start hostapd :
hostapd "$HOSTAPD_CONF" &
EchoStatus $? "Start hostapd"

sleep 2

dhclient -4 "$ETH_IFACE_NAME" &

EchoStatus $? "DHCLIENT on $WLAN_IFACE_NAME"

# Configure eth and forwarding

ifconfig "$WLAN_IFACE_NAME" "$WLAN_IFACE_IP" "$WLAN_IFACE_SUBNET_MASTK" 

EchoStatus $? "Set IP $WLAN_IFACE_IP on $WLAN_IFACE_NAME"

echo "net.ipv4.ip_forward=1" >> /etc/sysctl.conf

EchoStatus $? "Enable ipv4 forwarding"

iptables -t nat -A POSTROUTING -o "$ETH_IFACE_NAME" -j MASQUERADE 

EchoStatus $? "Enable NAT masquerade"

echo "PORT_FORWARDING exists... creating rules"

for it in ${PORT_FORWARDING[@]}; do

        PROTOCOL=`echo "$it" | cut -d ';' -f1`
	PORT_FROM=`echo "$it" | cut -d ';' -f2`
	IP=`echo "$it" | cut -d ';' -f3`
        PORT_TO=`echo "$it" | cut -d ';' -f4`

	iptables -t nat -A PREROUTING -i "$ETH_IFACE_NAME" -p "$PROTOCOL" --dport "$PORT_FROM" -j DNAT --to "$IP":"$PORT_TO"
	EchoStatus $? "Add PREROUTING forwarding for $PROTOCOL on input port $PORT_FROM to $IP (destination port $PORT_TO)"

done

# Create /tmp/wifi-bridge-dhcpd-logger.sh

# First create the static readme file
echo " " > "$DHCPD_LOG_FILE"/readme.txt
echo "Description: This is a wifi bridge router, serving internet to an access point" >> "$DHCPD_LOG_FILE"/readme.txt
echo "Author     : Matthieu Holtz" >> "$DHCPD_LOG_FILE"/readme.txt
echo "Year       : 2018" >> "$DHCPD_LOG_FILE"/readme.txt
echo "Project    : https://github.com/jarod68/wifi-bridge" >> "$DHCPD_LOG_FILE"/readme.txt
sed -i '1s/^/# Generated on '"$timestamp"'\n/' "$DHCPD_LOG_FILE"/readme.txt

# Then create the script
echo "#!/bin/bash" >/tmp/wifi-bridge-dhcpd-logger.sh
echo "" >>/tmp/wifi-bridge-dhcpd-logger.sh
echo "# Prevent the file of being too big!!" >>/tmp/wifi-bridge-dhcpd-logger.sh
echo 'if [ $(wc -l < "'"$DHCPD_LOG_FILE"'/wifi-bridge-leases.txt") -ge 128 ]; then rm "'"$DHCPD_LOG_FILE"'/wifi-bridge-leases.txt"; fi' >> /tmp/wifi-bridge-dhcpd-logger.sh

echo 'if [ $# -ne 4 ]; then exit 1; fi' >>/tmp/wifi-bridge-dhcpd-logger.sh
echo 'timestamp=`date`' >>/tmp/wifi-bridge-dhcpd-logger.sh
echo 'echo "$timestamp" "$1" "$2" "$3" "$4" >> "'"$DHCPD_LOG_FILE"/wifi-bridge-leases.txt'"' >>/tmp/wifi-bridge-dhcpd-logger.sh
sed -i '1s/^/# Generated on '"$timestamp"'\n/' "/tmp/wifi-bridge-dhcpd-logger.txt"

chmod 777 "/tmp/wifi-bridge-dhcpd-logger.sh"

# Configure DHCP server

echo "authoritative;" > "$ICS_DHCP_CONF"
echo "default-lease-time 600;" > "$ICS_DHCP_CONF"
echo "max-lease-time 7200;" >> "$ICS_DHCP_CONF"
echo "option subnet-mask $WLAN_IFACE_SUBNET_MASTK;" >> "$ICS_DHCP_CONF"
echo "option routers $WLAN_IFACE_IP;" >> "$ICS_DHCP_CONF"
echo 'option domain-name "'"$WLAN_DOMAIN_NAME"'";' >> "$ICS_DHCP_CONF"
echo "option domain-name-servers $WLAN_DNS_SERVER;" >> "$ICS_DHCP_CONF"
echo "option ntp-servers pool.ntp.org;" >> "$ICS_DHCP_CONF"

echo "" >> "$ICS_DHCP_CONF"
echo "## DHCP reservation by MAC addresses ##" >> "$ICS_DHCP_CONF"
echo "" >> "$ICS_DHCP_CONF"
for it in ${DHCP_RESERVATIONS[@]}; do

        MAC=`echo "$it" | cut -d ';' -f1`
	IP=`echo "$it" | cut -d ';' -f2`
	NAME=`echo "$it" | cut -d ';' -f3`

        echo "# $NAME #" >> "$ICS_DHCP_CONF"

	echo "host $NAME {" >> "$ICS_DHCP_CONF"
	echo "      hardware ethernet $MAC;" >> "$ICS_DHCP_CONF"
	echo "      fixed-address $IP;" >> "$ICS_DHCP_CONF"
	echo "}" >> "$ICS_DHCP_CONF"

done
echo "" >> "$ICS_DHCP_CONF"

echo "subnet $WLAN_DHCP_SUBNET netmask $WLAN_IFACE_SUBNET_MASTK {" >> "$ICS_DHCP_CONF"
echo "   range $WLAN_DHCP_START $WLAN_DHCP_STOP;" >> "$ICS_DHCP_CONF"

echo "" >> "$ICS_DHCP_CONF"
echo '   on commit {' >> "$ICS_DHCP_CONF"
echo '   set clip = binary-to-ascii(10, 8, ".", leased-address);' >> "$ICS_DHCP_CONF"
echo '   set clhw = binary-to-ascii(16, 8, ":", substring(hardware, 1, 6));' >> "$ICS_DHCP_CONF"
echo '   set name = pick-first-value(option host-name, noname);' >> "$ICS_DHCP_CONF"
echo '   execute("/tmp/wifi-bridge-dhcpd-logger.sh", "commit", clip, clhw, name);' >> "$ICS_DHCP_CONF"
echo '   }' >> "$ICS_DHCP_CONF"
echo "" >> "$ICS_DHCP_CONF"

echo "" >> "$ICS_DHCP_CONF"
echo '   on release {' >> "$ICS_DHCP_CONF"
echo '   set clip = binary-to-ascii(10, 8, ".", leased-address);' >> "$ICS_DHCP_CONF"
echo '   set clhw = binary-to-ascii(16, 8, ":", substring(hardware, 1, 6));' >> "$ICS_DHCP_CONF"
echo '   set name = pick-first-value(option host-name, noname);' >> "$ICS_DHCP_CONF"
echo '   execute("/tmp/wifi-bridge-dhcpd-logger.sh", "release", clip, clhw, name);' >> "$ICS_DHCP_CONF"
echo '   }' >> "$ICS_DHCP_CONF"
echo "" >> "$ICS_DHCP_CONF"

echo "" >> "$ICS_DHCP_CONF"
echo '   on expiry {' >> "$ICS_DHCP_CONF"
echo '   set clip = binary-to-ascii(10, 8, ".", leased-address);' >> "$ICS_DHCP_CONF"
echo '   set clhw = binary-to-ascii(16, 8, ":", substring(hardware, 1, 6));' >> "$ICS_DHCP_CONF"
echo '   set name = pick-first-value(option host-name, noname);' >> "$ICS_DHCP_CONF"
echo '   execute("/tmp/wifi-bridge-dhcpd-logger.sh", "expiry", clip, clhw, name);' >> "$ICS_DHCP_CONF"
echo '   }' >> "$ICS_DHCP_CONF"
echo "" >> "$ICS_DHCP_CONF"
echo "}" >> "$ICS_DHCP_CONF"

sed -i '1s/^/# Generated on '"$timestamp"'\n/' "$ICS_DHCP_CONF"

EchoStatus $? "Create $ICS_DHCP_CONF with content =>"

cat "$ICS_DHCP_CONF"

# Start the dhcpd server daemon :

/usr/sbin/dhcpd -cf "$ICS_DHCP_CONF" "$WLAN_IFACE_NAME"
EchoStatus $? "Start dhcpcd on $WLAN_IFACE_NAME"

echo "nameserver $WLAN_DNS_SERVER" > /etc/resolv.conf
EchoStatus $? "Sanitize /etc/resolv.conf with only $WLAN_DNS_SERVER"
