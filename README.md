Nouveau nom du pi : pi_photomaton
Nouveau Repository gitHub : pi_photomaton

Install Samba, avec dossier partagé : /share (Avec nouvelle conf pour le partage /etc/samba/conf...)

Install de la webcam sur le pi : /dev/video01 , puis install & utilisation de la commande de fswebcam pour capture image

Branchement du circuit avec les composants (LED, bouton poussoir)

Clone GPIO_Utility, build GPIO project, utilisation du projet (gpio -g mode out/in, gpio -g write 1)

Script pour orchestrer le tout

Install python3 et python3-pigpio, changement de la version utilisé par le pi

Lancement du script OK

Installation nginx (serveur web) -> on met le root dans /share/www/
accessible depuis l'adresse du PI

Installation de hostapd (dongle wifi)
apt-cache search dhcpd (donne les noms des serveurs dhcp viable pour le PI => on trouve isc-dhcp-server)
installation de isc-dhcp-server (donnera des IP aux hotes qui se connecteront)


Test mqtt
:
mosquitto_pub --host localhost --topic "photomaton/take" -m "go"
mosquitto_sub --host localhost --topic "#"
