#!/bin/bash

WLAN_IFACE=wlan0
ETH_IFACE=eth0

kill_photomaton()
{
        airmon-ng check kill
        killall dhcpd
        killall python
	killall hostapd
}

start()
{
	echo "Starting... network"
	kill_photomaton
	hostapd -B /share/pi_photomaton/hostapd.conf

	ifconfig $WLAN_IFACE 10.0.0.254 255.255.255.0

	dhcpd -cf /share/pi_photomaton/dhcpd.conf
	echo 1 > /proc/sys/net/ipv4/ip_forward
	

	iptables -t nat -A POSTROUTING -o $ETH_IFACE -j MASQUERADE
	iptables -A FORWARD -i $ETH_IFACE -o $WLAN_IFACE -m state --state RELATED,ESTABLISHED -j ACCEPT
	iptables -A FORWARD -i $WLAN_IFACE -o $ETH_IFACE -j ACCEPT

	iptables -t nat -A PREROUTING -p tcp --dport 80 -j DNAT --to-destination 10.0.0.254:80
        iptables -t nat -A PREROUTING -p tcp --dport 443 -j DNAT --to-destination 10.0.0.254:80

	echo "Starting... photomaton"

	/share/pi_photomaton/photomaton.py &
}

stop()
{
	echo "Stopping..."
	kill_photomaton
}


case "$1" in
  start)
    start
    ;;
  stop)
    stop
    ;;
  restart)
    stop
    start
    ;;
  *)
    echo "Usage: $0 {start|stop|restart}"
esac
