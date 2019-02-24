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

RAM_DISK_PATH = "/tmp/photomaton-ramdisk/"
FILE_SAVE_PATH = "/var/photomaton-www/images/"
FILE_SAVE_PATH_THUMBNAILS = FILE_SAVE_PATH + "thumbnails/"
FILE_SAVE_PATH_RENDER = FILE_SAVE_PATH + "rendering/"
client = mqtt.Client("pythonClient")


def capture():
	filename = time.strftime('%d-%m-%y_%H-%M-%S')

#	ret=call(["raspistill", "-o", RAM_DISK_PATH+filename+".jpg" ])

	# Capture
	ret=call(["gphoto2", "--capture-image-and-download", "--filename", "/var/photomaton-www/images/"+filename+".jpg"])

	# On error generate dummy file
	if ret != 0:
		call(["convert", "-pointsize", "120", "-font", "DejaVu-Sans", "label:"+filename, RAM_DISK_PATH+filename+".jpg"])

	# Render it
	call(["convert", "-thumbnail", "800x480", RAM_DISK_PATH+filename+".jpg", FILE_SAVE_PATH_RENDER+filename+".jpg"])

	# Thumbnail it
	call(["convert", "-thumbnail", "200x200", RAM_DISK_PATH+filename+".jpg", FILE_SAVE_PATH_THUMBNAILS+filename+".jpg"])

	Popen(["mv", RAM_DISK_PATH+filename+".jpg", FILE_SAVE_PATH+filename+".jpg"])

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

def ram_disk_create():

	if os.path.isdir(RAM_DISK_PATH):
		call(["umount", RAM_DISK_PATH])
	else :
		call(["mkdir", RAM_DISK_PATH])

	call(["mount", "-t", "tmpfs", "-o", "size=20m", "tmpfs", RAM_DISK_PATH])


def main():
	ram_disk_create()
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
