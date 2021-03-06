## Description

Install a photobooth system on a raspberry PI.
It comes bundled with a wifi AP routeur (eth -> wifi), an NGINX webserver, an MQTT broker with websockt support,
Samba fileshare, python business logic, html/javascript web UI to be screened on the device.

### Hardware casing with touchscreen


<img src="https://github.com/axelgerenius/pi_photomaton/blob/master_v2/20190807_195312.jpg" alt="drawing" width="200"/>

## Installation

Configuration:
Wifi edit :
```bash
wifi-bridge-ap_variant/wifi-bridge.config
```

Full installation (AP, NGINX, MQTT with WS, init scripts and web UI):
```bash
./photomaton-setup.sh
```

Light installation (Only init script and web UI):
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

### Python script published topics

| TOPIC                  | MESSAGE       | DESCRIPTION                   |
| ---------------------- | ------------- | ----------------------------- |
| photomaton/newPhoto    | Pic filename  | A photo was taken             |
| photomaton/started     | None          | Phyton script started         |
| photomaton/button      | None          | The button was pressed        |
| photomaton/list_result | None          | Result of photomaton/list     |

### Python script subscribed topics

| TOPIC                 | MESSAGE       | DESCRIPTION                |
| --------------------- | ------------- | -------------------------- |
| photomaton/take       | None          | Ask a new photo            |
| photomaton/list       | None          | Ask list of all photos     |


## Open ui
Put in
```
 /home/pi/.config/lxsession/LXDE-pi/autostart
```
```

@xset s off
@xset -dpms
@xset s noblank
@unclutter
@chromium-browser --app=http://localhost:80 --start-fullscreen

```

## Docker
Build :
```
sudo docker build -t rpi-photom .
```

Run to access on port 8081 : 
```
sudo docker run -p 1883:1883 -p 8081:80 -p 9001:9001 --detach rpi-photom
```

Run to access on port 8081 and mount ui: 
```
sudo docker run --rm -p 1883:1883 -p 8081:80 -p 9001:9001 --mount type=bind,source=`pwd`/ui/dist,target=/var/photomaton-www --detach rpi-photom
```
