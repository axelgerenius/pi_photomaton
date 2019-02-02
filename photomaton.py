#!/usr/bin/env python

import sys
import time
import RPi.GPIO as GPIO
import paho.mqtt.client as mqtt
from enum import Enum
from subprocess import call

RED_LED_GPIO = 17
BLUE_LED_GPIO = 22
GREEN_LED_GPIO = 27

BUTTON_GPIO = 4

FILE_SAVE_PATH = "/var/photomaton-www/images/"

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
	call(["convert", "-pointsize", "120", "label:"+filename, FILE_SAVE_PATH+filename+".png"])

	print("capture")
	client.publish("photomaton/newPhoto",filename + '.png')
	applyColor(Color.Red)
	time.sleep(3)
	applyColor(Color.Green)

def on_message(client, userdata, message):
	print("message received " ,str(message.payload.decode("utf-8")))
	print("message topic=",message.topic)
	print("message qos=",message.qos)
	print("message retain flag=",message.retain)

	if message.topic == "photomaton/take" :
		print("good topic")
		capture()


def main():
	initGPIO()
	applyColor(Color.Green)

	client.connect("127.0.0.1")
	client.on_message=on_message #attach function to callback
	client.loop_start() #start the loop
	client.subscribe("photomaton/take")
	client.publish("photomaton/started", "started")
	while True:
		if buttonPressed() == True:
			client.publish("photomaton/button", "pressed")
#			capture()

		time.sleep(10/1000)

	client.loop_stop() #stop the loop

main()
