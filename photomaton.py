#!/usr/bin/env python

import sys
import os
import time
import paho.mqtt.client as mqtt
import json
from enum import Enum
from subprocess import call
from subprocess import Popen
from stat import *


FILE_SAVE_PATH = "/var/photomaton-www/images/"
FILE_SAVE_PATH_THUMBNAILS = FILE_SAVE_PATH + "thumbnails/"

client = mqtt.Client("pythonClient")


def capture():
	filename = time.strftime('%d-%m-%y_%H-%M-%S')

#	ret=call(["raspistill", "-o", FILE_SAVE_PATH+filename+".jpg" ])

	# Capture
	ret=call(["gphoto2", "--capture-image-and-download", "--filename", "/var/photomaton-www/images/"+filename+".jpg"])

	# On error generate dummy file
	if ret != 0:
		call(["convert", "-size", "1500x1000", "-pointsize", "120", "-font", "DejaVu-Sans", "label:"+filename, FILE_SAVE_PATH+filename+".jpg"])

	# Thumbnail it
	p = Popen(["convert", "-thumbnail", "200x200", FILE_SAVE_PATH+filename+".jpg", FILE_SAVE_PATH_THUMBNAILS+filename+".jpg"])

	client.publish("photomaton/newPhoto",filename + '.jpg')


def photo_list():
	files = os.listdir(FILE_SAVE_PATH)
	computed = []
	for name in files:
		if name.lower().endswith(('.png', '.jpg', '.jpeg')) :
			stat = os.stat(FILE_SAVE_PATH + name)
			f = {}
			f["image"] = name
			f["timestamp"] = stat.st_ctime
			f["size"] = stat.st_size
			computed.append(f)

	jsonfied = json.dumps(computed, ensure_ascii=False)
	client.publish("photomaton/list_result",jsonfied)


def on_message(client, userdata, message):
	print("message received " ,str(message.payload.decode("utf-8")))
	print("message topic=",message.topic)
	print("message qos=",message.qos)
	print("message retain flag=",message.retain)

	if message.topic == "photomaton/take" :
		print("Topic take")
		capture()

	elif message.topic == "photomaton/list" :
		print("Topic list")
		photo_list()


def main():
	client.connect("127.0.0.1")
	client.on_message=on_message #attach function to callback
	client.loop_start() #start the loop
	client.subscribe("photomaton/take")
	client.subscribe("photomaton/list")
	client.publish("photomaton/started", "started")
	while True:
		time.sleep(10/1000)

	client.loop_stop() #stop the loop

main()
