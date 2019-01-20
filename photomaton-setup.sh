#!/bin/bash

#apt-get update && apt-get install -y python

MOSQUITTO_VER=mosquitto-1.4.14

cd wifi-bridge-ap_variant
./wifi-bridge-install.sh
cd ..

sudo apt-get update

sudo apt-get install -y python3 \
python-pip \
python3-pip \
build-essential \
python \
quilt \
devscripts \
python-setuptools \
python3 \
libssl-dev \
cmake \
libc-ares-dev \
uuid-dev \
daemon \
zlibc \
zlib1g \
zlib1g-dev

sudo update-alternatives --install /usr/bin/python python /usr/bin/python3 10

sudo pip install RPi.GPIO

# Compile libwebsockets
git clone https://github.com/warmcat/libwebsockets.git
cd libwebsockets
mkdir build
cd build
cmake .. && sudo make install && sudo ldconfig

# Compile mosquitto
mkdir ~/mosquitto
cd ~/mosquitto/

wget https://mosquitto.org/files/source/$MOSQUITTO_VER.tar.gz
tar zxvf $MOSQUITTO_VER.tar.gz
cd $MOSQUITTO_VER

sed -i 's/WITH_WEBSOCKETS:=no/WITH_WEBSOCKETS:=yes/g' config.mk

make && sudo make install
sudo cp mosquitto.conf /etc/mosquitto

echo

echo "port 1883" >> /etc/mosquitto/mosquitto.conf
echo "listener 9001" >> /etc/mosquitto/mosquitto.conf
echo "protocol websockets" >> /etc/mosquitto/mosquitto.conf
echo "pid_file /var/run/mosquitto.pid" >> /etc/mosquitto/mosquitto.conf

# Création d’un lien
sudo ln -s /usr/local/sbin/mosquitto /bin/mosquitto





