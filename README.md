Nouveau nom du pi : pi_photomaton
Nouveau Repository gitHub : pi_photomaton

Install Samba, avec dossier partagé : /share (Avec nouvelle conf pour le partage /etc/samba/conf...)

Install de la webcam sur le pi : /dev/video01 , puis install & utilisation de la commande de fswebcam pour capture image

Branchement du circuit avec les composants (LED, bouton poussoir)

Configuration:
Wifi edit :
```bash
wifi-bridge-ap_variant/wifi-bridge.config
```

Full installation :
```bash
./photomaton-setup.sh
```

Light installation :
```bash
./photomaton-setup.sh --light
```

Startup :
```bash
/etc/init.d/photomaton start
```

Test mqtt bash :
```bash
mosquitto_pub --host localhost --topic "photomaton/take" -m "go"

mosquitto_sub --host localhost --topic "#"
```

