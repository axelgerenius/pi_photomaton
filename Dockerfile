FROM balenalib/rpi-raspbian

COPY wifi-bridge-ap_variant /photom/wifi-bridge-ap_variant
COPY photomaton-setup.sh /photom/photomaton-setup.sh
COPY helpers /photom/helpers

WORKDIR /photom

RUN ./photomaton-setup.sh

RUN adduser mosquitto

COPY photomaton.py /photom/photomaton.py
COPY ui/dist /var/photomaton-www
COPY docker-run.sh /photom/run.sh
RUN chmod +x run.sh

ENTRYPOINT [ "/run.sh" ]

