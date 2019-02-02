#!/bin/bash

nginx -c /etc/wifi-bridge/nginx.conf

mosquitto -d -c /etc/mosquitto/mosquitto.conf

./photomaton.py