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
import dropbox
from dropbox.files import WriteMode
from dropbox.exceptions import ApiError, AuthError

FILE_SAVE_PATH = "/var/photomaton-www/images/"
FILE_PENDING_PATH = "/var/photomaton-www/pending/"
APP_TOKEN = "yvIGI9Aih8AAAAAAAAAACSNXEOzNulapuPpYw4UDB68A-P1u26O_hZM3oatR3G9z"
client = mqtt.Client("DropboxClient")

def push(filename):
	ret=call(["touch", FILE_PENDING_PATH + filename])


def upload():

	files = os.listdir(FILE_PENDING_PATH)

	dbx = dropbox.Dropbox(APP_TOKEN)

	for name in files:
		f = open(FILE_SAVE_PATH + name, 'rb')
		try:
			dbx.files_upload(f.read(),"/" + name, mode=WriteMode('overwrite'))
			client.publish("photomaton/dropbox/upload", name)
			call(["rm", FILE_PENDING_PATH + name])
		except ApiError as err:
			# This checks for the specific error where a user doesn't have
			# enough Dropbox space quota to upload this file
			if (err.error.is_path() and err.error.get_path().reason.is_insufficient_space()) :
				print("Not enough space on Dropbox")
			elif err.user_message_text :
				print(err.user_message_text)
			else :
				print(err)
			break

def on_message(client, userdata, message):
	print("message received " ,str(message.payload.decode("utf-8")))
	print("message topic=",message.topic)
	print("message qos=",message.qos)
	print("message retain flag=",message.retain)

	if message.topic == "photomaton/newPhoto" :
		print("Topic newPhoto")
		push(str(message.payload.decode("utf-8")))


def main():
	client.connect("127.0.0.1")
	client.on_message=on_message #attach function to callback
	client.loop_start() #start the loop
	client.subscribe("photomaton/newPhoto")
	while True:
		time.sleep(2)
		upload()

	client.loop_stop() #stop the loop

main()
