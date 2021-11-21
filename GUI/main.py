# This Python file uses the following encoding: utf-8
import sys
import os
import time

import board
from digitalio import DigitalInOut, Direction
import adafruit_fingerprint_fix as adafruit_fingerprint

led = DigitalInOut(board.D13)
led.direction = Direction.OUTPUT

import serial
uart = serial.Serial("/dev/ttyS0", baudrate=57600, timeout=1)

finger = adafruit_fingerprint.Adafruit_Fingerprint(uart)

from PyQt5 import uic,QtGui
from PyQt5.QtWidgets import QApplication, QWidget
from PyQt5.QtCore import QFile

orange = "#FA992B"
green = "#00E68F"
red = "#D10101"
grey = "#808080"
green_verified = "#01D119"

class gui(QWidget):
    def __init__(self):
        super(gui, self).__init__()
        uic.loadUi('form.ui', self)
        self.setGeometry(0,0,800,480)
        self.setStyleSheet("background-color : white;")

        self.statusLabel.setText("status here")
        self.idLabel.setText("id is")
        self.registerButton.clicked.connect(self.onRegister)
        self.searchButton.clicked.connect(self.onSearch)

        self.registerButton.setStyleSheet("background-color : " + grey)
        self.searchButton.setStyleSheet("background-color : " + grey)
        self.statusLabel.setStyleSheet("background-color : " + grey)
        self.show()

#call the method in fingerprint.py and send result to
    def onRegister(self):
        self.registerButton.setStyleSheet("background-color : " + orange)
         #self.show()
        print("Register clicked")
        QApplication.processEvents()
         #self.statusLabel.setText("Place thumb on the scanner")
        ''''QApplication.processEvents()
         status = self.readFingerPrint()

         #first fingerprint
         if status:
             #self.statusLabel.setStyleSheet("background-color : " + green_verified)
             self.statusLabel.setPixmap(QtGui.QPixmap("check.jpg"))
             QApplication.processEvents()
         else:
             self.error()

         time.sleep(3)
         self.statusLabel.setText("Place thumb again on the scanner")
         QApplication.processEvents()

         status = self.readFingerPrint()

         #first fingerprint
         if status:
             #self.statusLabel.setStyleSheet("background-color : " + green_verified)
             self.statusLabel.setPixmap(QtGui.QPixmap("check.jpg"))
             QApplication.processEvents()
         else:
             self.error()
         time.sleep(3)
         self.registerButton.setStyleSheet("background-color : " + grey)
         self.statusLabel.setStyleSheet("background-color : " + grey)
         self.statusLabel.setPixmap(QtGui.QPixmap(""))
         self.statusLabel.setText("")'''
         
        for fingerimg in range(1, 3):
            if fingerimg == 1:
                 self.statusLabel.setText("Place thumb on the scanner")
            else:
                 self.statusLabel.setText("Place thumb again on the scanner")

            while True:
                self.statusLabel.setPixmap(QtGui.QPixmap(""))
                i = finger.get_image()
                if i == adafruit_fingerprint.OK:
                    self.statusLabel.setPixmap(QtGui.QPixmap("check.jpg"))
                    QApplication.processEvents()
                    break
                if i == adafruit_fingerprint.NOFINGER:
                    print(".", end="", flush=True)
                elif i == adafruit_fingerprint.IMAGEFAIL:
                    self.error()
                else:
                    self.error()

            print("Templating...", end="", flush=True)
            i = finger.image_2_tz(fingerimg)
            if i == adafruit_fingerprint.OK:
                print("Templated")
            else:
                if i == adafruit_fingerprint.IMAGEMESS:
                    print("Image too messy")
                elif i == adafruit_fingerprint.FEATUREFAIL:
                    print("Could not identify features")
                elif i == adafruit_fingerprint.INVALIDIMAGE:
                    print("Image invalid")
                else:
                    print("Other error")

            if fingerimg == 1:
                print("Remove finger")
                time.sleep(1)
                while i != adafruit_fingerprint.NOFINGER:
                    i = finger.get_image()

        print("Creating model...", end="", flush=True)
        i = finger.create_model()
        if i == adafruit_fingerprint.OK:
            print("Created")
                    
                    #saved_model = finger.get_fpdata('char')
                    #TODO: send to database
                    #print(saved_model)
                    
        else:
            if i == adafruit_fingerprint.ENROLLMISMATCH:
                print("Prints did not match")
                self.error()
            else:
                print("Other error")
                self.error()

        time.sleep(3)
        self.registerButton.setStyleSheet("background-color : " + grey)
        self.statusLabel.setStyleSheet("background-color : " + grey)
        self.statusLabel.setPixmap(QtGui.QPixmap(""))
        self.statusLabel.setText("")

#makes a call to API to verify
    def onSearch(self):
        print("Search clicked")
        self.searchButton.setStyleSheet("background-color : " + green)
        self.statusLabel.setText("Verifying...")
        QApplication.processEvents()
        status = self.readFingerPrint()


        if status:
            #self.statusLabel.setStyleSheet("background-color : " + green_verified)
            #self.statusLabel.setText("Fingerprint Found")
            self.statusLabel.setPixmap(QtGui.QPixmap("check.jpg"))
            QApplication.processEvents()
        else:
            self.error()
        time.sleep(3)
        self.searchButton.setStyleSheet("background-color : " + grey)
        self.statusLabel.setStyleSheet("background-color : " + grey)
        self.statusLabel.setPixmap(QtGui.QPixmap(""))
        self.statusLabel.setText("")



    def error(self):
        print("Error")
        self.statusLabel.setStyleSheet("background-color : " + red)
        self.statusLabel.setText("Error")
        QApplication.processEvents()

    def readFingerPrint(self):
        time.sleep(2)
        print("works")
        return True

if __name__ == "__main__":
    app = QApplication([])
    widget = gui()
    widget.show()
    sys.exit(app.exec_())
