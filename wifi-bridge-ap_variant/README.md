# wifi-bridge
Wifi bridge WLAN <-> ETH for a raspbery pi (tested and running on raspbian, but could be adapted for other OS)

It uses:
* wpa_supplicant
* isc dhcpd
* iptables
* samba
* nginx

# Installation
To install run wifi-bridge-setup.sh, it will create a service in /etc/init.d called wifi-bridge and enable it for boot start. 
The configuration file wifi-bridge.config allows you to configure IP address / dhcp / forwarding / SSID and WPA key
The configuration file used, and the script are the one from this local directory; moving them or deleting them after installation
would result of a faillure of the service script.

# Debugging and usage

## Checkup
A cyclicall checkup is perfomed to ensure that the wifi connection is still working. If there is a problem, a retry and restart of
the scripts is perfomed

## Status
A log file with checkup status and all leases delivered by the DHCP server are available trough http:ETH_IP:80
Theses files are also served under smb://ETH_IP/log

## Additional info
A samba server is running to store some file if needed
All the files / subscripts are generated while running and starting and put in the /tmp location

---

Feel free to improve and modify
