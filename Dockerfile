FROM balenalib/rpi-raspbian

COPY wifi-bridge-ap_variant /photom/wifi-bridge-ap_variant
COPY photomaton-setup.sh /photom/photomaton-setup.sh

WORKDIR /photom

RUN ./photomaton-setup.sh

RUN adduser mosquitto

RUN nginx -c /etc/wifi-bridge/nginx.conf

RUN mosquitto -d -c /etc/mosquitto/mosquitto.conf

COPY photomaton.py /photom/photomaton.py
COPY ui/dist /var/photomaton-www

ENTRYPOINT [ "/etc/init.d/photomaton start" ]

