#!/bin/bash

#apt-get update && apt-get install -y python

my_dir=`pwd`
timestamp=`date`

source "$my_dir/helpers"

######### Custtomization area #########

SERVICE_NAME="photomaton"
INITD_SCRIPT_PATH="/etc/init.d/$SERVICE_NAME"
MOSQUITTO_VER=mosquitto-1.4.14
WEB_WWW="/var/photomaton-www"

#######################################
part1 ()
{
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
	git \
	wget

	EchoStatus $? "Update packages..."

	sudo update-alternatives --install /usr/bin/python python /usr/bin/python3 10

	sudo pip install RPi.GPIO paho-mqtt

	EchoStatus $? "Install Python dependencies for GPIO and MQTT..."

	# Compile libwebsockets
	git clone https://github.com/warmcat/libwebsockets.git
	cd libwebsockets
	mkdir build
	cd build
	cmake .. && sudo make install && sudo ldconfig

	EchoStatus $? "Compile libwebsockets"

	# Compile mosquitto
	mkdir ~/mosquitto
	cd ~/mosquitto/

	wget https://mosquitto.org/files/source/$MOSQUITTO_VER.tar.gz
	tar zxvf $MOSQUITTO_VER.tar.gz
	cd $MOSQUITTO_VER

	sed -i 's/WITH_WEBSOCKETS:=no/WITH_WEBSOCKETS:=yes/g' config.mk

	make && sudo make install
	EchoStatus $? "Compile mosquito..."

	sudo cp mosquitto.conf /etc/mosquitto

	EchoStatus $? "Configure mosquito..."


	echo "port 1883" >> /etc/mosquitto/mosquitto.conf
	echo "listener 9001" >> /etc/mosquitto/mosquitto.conf
	echo "protocol websockets" >> /etc/mosquitto/mosquitto.conf
	echo "pid_file /var/run/mosquitto.pid" >> /etc/mosquitto/mosquitto.conf

	# ln mosquito in /bin
	sudo ln -s /usr/local/sbin/mosquitto /bin/mosquitto

}

part2 ()
{
	# Copy the web UI to the server www
	rm -R "$WEB_WWW"
	mkdir -p "$WEB_WWW"
	cp -r $my_dir/ui/dist/* "$WEB_WWW/"

	EchoStatus $? "Copy web ui in $WEB_WWW"

	echo "#!/bin/bash" > "$INITD_SCRIPT_PATH"

	echo "" >> "$INITD_SCRIPT_PATH"

	echo "### BEGIN INIT INFO" >> "$INITD_SCRIPT_PATH"
	echo "# Provides:          $SERVICE_NAME" >> "$INITD_SCRIPT_PATH"
	echo "# Required-Start:    " >> "$INITD_SCRIPT_PATH"
	echo "# Required-Stop:     " >> "$INITD_SCRIPT_PATH"
	echo "# Default-Start:     2 3 4 5" >> "$INITD_SCRIPT_PATH"
	echo "# Default-Stop:      0 1 6" >> "$INITD_SCRIPT_PATH"
	echo "# Short-Description: $SERVICE_NAME" >> "$INITD_SCRIPT_PATH"
	echo "# Description:       $SERVICE_NAME" >> "$INITD_SCRIPT_PATH"
	echo "### END INIT INFO" >> "$INITD_SCRIPT_PATH"

	echo "" >> "$INITD_SCRIPT_PATH"

	echo "source "'"'"$my_dir/helpers"'"' >> "$INITD_SCRIPT_PATH"

	echo "" >> "$INITD_SCRIPT_PATH"

	echo "function process_stop {" >> "$INITD_SCRIPT_PATH"
	echo '    echo "Kill Mosquitto"' >> "$INITD_SCRIPT_PATH"
	echo '    if [ -f /tmp/mosquitto_pid ]' >> "$INITD_SCRIPT_PATH"
	echo '    then' >> "$INITD_SCRIPT_PATH"
	echo '      PID_TO_KILL=`cat /tmp/mosquitto_pid`' >> "$INITD_SCRIPT_PATH"
	echo '      kill -9 $PID_TO_KILL' >> "$INITD_SCRIPT_PATH"
	echo '      rm /tmp/mosquitto_pid' >> "$INITD_SCRIPT_PATH"
	echo '    fi' >> "$INITD_SCRIPT_PATH"
	echo "" >> "$INITD_SCRIPT_PATH"
	echo '    echo "Kill photomaton"' >> "$INITD_SCRIPT_PATH"
	echo '    if [ -f /tmp/photomaton_pid ]' >> "$INITD_SCRIPT_PATH"
	echo '    then' >> "$INITD_SCRIPT_PATH"
	echo '      PID_TO_KILL=`cat /tmp/photomaton_pid`' >> "$INITD_SCRIPT_PATH"
	echo '      kill -9 $PID_TO_KILL' >> "$INITD_SCRIPT_PATH"
	echo '      rm /tmp/photomaton_pid' >> "$INITD_SCRIPT_PATH"
	echo '    fi' >> "$INITD_SCRIPT_PATH"

	echo "}" >> "$INITD_SCRIPT_PATH"

	echo "" >> "$INITD_SCRIPT_PATH"

	echo "function process_start {" >> "$INITD_SCRIPT_PATH"
	echo '    mosquitto -d -c /etc/mosquitto/mosquitto.conf' >> "$INITD_SCRIPT_PATH"
	echo '    MOSQUITTO_PROC_PID=$!' >> "$INITD_SCRIPT_PATH"
	echo '    echo "$MOSQUITTO_PROC_PID" > /tmp/mosquitto_pid' >> "$INITD_SCRIPT_PATH"
	echo '    echo "Launch Mosquitto with PID $MOSQUITTO_PROC_PID"' >> "$INITD_SCRIPT_PATH"

	echo '    nohup /usr/bin/python3 "'"$my_dir/photomaton.py"'" > /dev/null 2>&1 &' >> "$INITD_SCRIPT_PATH"
	echo '    PHOTOMATON_PROC_PID=$!' >> "$INITD_SCRIPT_PATH"
	echo '    echo "$PHOTOMATON_PROC_PID" > /tmp/photomaton_pid' >> "$INITD_SCRIPT_PATH"
	echo '    echo "Launch Python script with PID $PHOTOMATON_PROC_PID"' >> "$INITD_SCRIPT_PATH"

	echo "}" >> "$INITD_SCRIPT_PATH"

	echo "" >> "$INITD_SCRIPT_PATH"

# /!\ $1 is the argument of the service script, not the install script
	echo 'case "$1" in' >> "$INITD_SCRIPT_PATH"

	echo '##################' >> "$INITD_SCRIPT_PATH"
	echo '# Start handling #' >> "$INITD_SCRIPT_PATH"
	echo '##################' >> "$INITD_SCRIPT_PATH"

	echo "  start)" >> "$INITD_SCRIPT_PATH"
	echo '    echo "Starting..."' >> "$INITD_SCRIPT_PATH"
	echo "    process_stop" >> "$INITD_SCRIPT_PATH"
	echo "    process_start" >> "$INITD_SCRIPT_PATH"
	echo "    exit 0" >> "$INITD_SCRIPT_PATH"
	echo "    ;;" >> "$INITD_SCRIPT_PATH"

	echo '#################' >> "$INITD_SCRIPT_PATH"
	echo '# Stop handling #' >> "$INITD_SCRIPT_PATH"
	echo '#################' >> "$INITD_SCRIPT_PATH"

	echo "  stop)" >> "$INITD_SCRIPT_PATH"
	echo '    echo "Stoping..."' >> "$INITD_SCRIPT_PATH"
	echo "    process_stop" >> "$INITD_SCRIPT_PATH"
	echo "    exit 0" >> "$INITD_SCRIPT_PATH"
	echo "    ;;" >> "$INITD_SCRIPT_PATH"

	echo '##################' >> "$INITD_SCRIPT_PATH"
	echo '# Other handling #' >> "$INITD_SCRIPT_PATH"
	echo '##################' >> "$INITD_SCRIPT_PATH"

	echo "  *)" >> "$INITD_SCRIPT_PATH"
	echo '    echo "Usage: '"$INITD_SCRIPT_PATH" '{start|stop}"' >> "$INITD_SCRIPT_PATH"
	echo "    exit 1" >> "$INITD_SCRIPT_PATH"
	echo "    ;;" >> "$INITD_SCRIPT_PATH"
	echo "esac" >> "$INITD_SCRIPT_PATH"

	echo '# End of autogenerated service script' >> "$INITD_SCRIPT_PATH"

	sed -i '2s/^/# Generated on '"$timestamp"'\n/' "$INITD_SCRIPT_PATH"

	echo "Create $INITD_SCRIPT_PATH =>"

	cat "$INITD_SCRIPT_PATH"

	sudo chmod +x "$INITD_SCRIPT_PATH"
	sudo chown root:root "$INITD_SCRIPT_PATH"

	EchoStatus $? "Set service file perm"

	sudo update-rc.d "$SERVICE_NAME" defaults

	EchoStatus $? "Add service with default start settings"

	sudo update-rc.d "$SERVICE_NAME" enable

	EchoStatus $? "Enable service"
}

help ()
{
	echo "Install the photomaton, with a wifi AP, samba share, NGINX webserver, MQTT with websocket and the "
	echo "   photomaton buisness logic written in Python. UI is an html/javascript interface hosted on the  "
	echo "   NGINX instance"
	echo ""
	echo "Options :"
	echo "       -h | --help      : display this help message"
	echo "       -l | --light     : install only the scripts and UI, the wifi AP, NGINX, MQTT are ignored"
	echo ""
}

main ()
{

	LIGHT=0
	while [ $# -ne 0 ]; do
		case "$1" in
			-l|--light)
				LIGHT=1
				EchoStatus 0 "Use light installation, skip AP, NGINX, MQTT..."
				shift
				;;
			-h|--help)
				help 
				exit 0
				;;
			*)
				echo "Unkown argument $1"
				echo ""
				help
				exit 6
			;;
		esac
	done

	# Do the part 1 if the option light wasn't used
	if [ LIGHT -eq 0 ] ;then
		part1
	fi

	# Then the part 2
	part2
}

main "$@"
