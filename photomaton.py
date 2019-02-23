#!/usr/bin/env python

import sys
import os
import time
import RPi.GPIO as GPIO
import paho.mqtt.client as mqtt
import json
from enum import Enum
from subprocess import call
from subprocess import Popen
from stat import *

RED_LED_GPIO = 17
BLUE_LED_GPIO = 22
GREEN_LED_GPIO = 27

BUTTON_GPIO = 4

FILE_SAVE_PATH = "/var/photomaton-www/images/"
FILE_SAVE_PATH_THUMBNAILS = FILE_SAVE_PATH + "thumbnails/"

client = mqtt.Client("pythonClient")

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)

class Color(Enum):
	Red = 0
	Green = 1
	Blue = 2
	Yellow = 3
	Magenta = 4
	Cyan = 5
	White = 6
	Off = 7

def applyColor(_color):

	if _color == Color.Red:
		GPIO.output(RED_LED_GPIO, GPIO.HIGH)
		GPIO.output(BLUE_LED_GPIO, GPIO.LOW)
		GPIO.output(GREEN_LED_GPIO, GPIO.LOW)

	elif _color == Color.Green:
		GPIO.output(RED_LED_GPIO, GPIO.LOW)
		GPIO.output(BLUE_LED_GPIO, GPIO.LOW)
		GPIO.output(GREEN_LED_GPIO, GPIO.HIGH)

	elif _color == Color.Blue:
		GPIO.output(RED_LED_GPIO, GPIO.LOW)
		GPIO.output(BLUE_LED_GPIO, GPIO.HIGH)
		GPIO.output(GREEN_LED_GPIO, GPIO.LOW)

	elif _color == Color.Yellow:
		GPIO.output(RED_LED_GPIO, GPIO.LOW)
		GPIO.output(BLUE_LED_GPIO, GPIO.HIGH)
		GPIO.output(GREEN_LED_GPIO, GPIO.HIGH)

	elif _color == Color.Magenta:
		GPIO.output(RED_LED_GPIO, GPIO.HIGH)
		GPIO.output(BLUE_LED_GPIO, GPIO.HIGH)
		GPIO.output(GREEN_LED_GPIO, GPIO.LOW)

	elif _color == Color.Cyan:
		GPIO.output(RED_LED_GPIO, GPIO.LOW)
		GPIO.output(BLUE_LED_GPIO, GPIO.HIGH)
		GPIO.output(GREEN_LED_GPIO, GPIO.HIGH)

	elif _color == Color.White:
		GPIO.output(RED_LED_GPIO, GPIO.HIGH)
		GPIO.output(BLUE_LED_GPIO, GPIO.HIGH)
		GPIO.output(GREEN_LED_GPIO, GPIO.HIGH)

	elif _color == Color.Off:
		GPIO.output(RED_LED_GPIO, GPIO.LOW)
		GPIO.output(BLUE_LED_GPIO, GPIO.LOW)
		GPIO.output(GREEN_LED_GPIO, GPIO.LOW)

def buttonPressed():
	return GPIO.input(BUTTON_GPIO) == GPIO.HIGH

def initGPIO():
	GPIO.setup(RED_LED_GPIO, GPIO.OUT)
	GPIO.setup(BLUE_LED_GPIO, GPIO.OUT)
	GPIO.setup(GREEN_LED_GPIO, GPIO.OUT)

	GPIO.setup(BUTTON_GPIO, GPIO.IN)

def capture():
	applyColor(Color.Cyan)
	filename = time.strftime('%d-%m-%y_%H-%M-%S')

	#call(["raspistill", "-o", filename ])
	#call(["cp", filename, FILE_SAVE_PATH + "last.jpg"])

#	ret=call(["raspistill", "-o", FILE_SAVE_PATH+filename+".jpg" ])

	# Capture
	ret=call(["gphoto2", "--capture-image-and-download", "--filename", "/var/photomaton-www/images/"+filename+".jpg"])

	# On error generate dummy file
	if ret != 0:
		call(["convert", "-pointsize", "120", "-font", "DejaVu-Sans", "label:"+filename, FILE_SAVE_PATH+filename+".jpg"])

	# Thumbnail it
	p = Popen(["convert", "-thumbnail", "200x200", FILE_SAVE_PATH+filename+".jpg", FILE_SAVE_PATH_THUMBNAILS+filename+".jpg"])

	client.publish("photomaton/newPhoto",filename + '.jpg')
	applyColor(Color.Red)
	time.sleep(3)
	applyColor(Color.Green)


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
	initGPIO()
	applyColor(Color.Green)

	client.connect("127.0.0.1")
	client.on_message=on_message #attach function to callback
	client.loop_start() #start the loop
	client.subscribe("photomaton/take")
	client.subscribe("photomaton/list")
	client.publish("photomaton/started", "started")
	while True:
		if buttonPressed() == True:
			client.publish("photomaton/button", "pressed")
#			capture()

		time.sleep(10/1000)

	client.loop_stop() #stop the loop

main()
