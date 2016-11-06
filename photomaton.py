#!/usr/bin/env python

import sys
import time
import RPi.GPIO as GPIO
from enum import Enum

RED_LED_GPIO = 17
BLUE_LED_GPIO = 22
GREEN_LED_GPIO = 27

BUTTON_GPIO = 4

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


def main():
	initGPIO()
	while True:
		if buttonPressed() == True:
			applyColor(Color.Green)
		else:
			applyColor(Color.Red)
		time.sleep(10/1000)


main()
