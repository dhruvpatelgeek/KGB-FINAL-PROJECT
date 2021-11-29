# This Python file uses the following encoding: utf-8
import sys
import os
import time
import requests
import json
import hashlib
from Crypto.Cipher import AES  # pip install pycryptodome

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
endpoint = "http://169.53.130.42:3000"

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
        self._key = b"QeThWmYq3t6w9z$C&F)J@NcRfUjXn2r4"

#call the method in fingerprint.py and send result to
    def onRegister(self):
        self.registerButton.setStyleSheet("background-color : " + orange)
         #self.show()
        print("Register clicked")
        QApplication.processEvents()
         #self.statusLabel.setText("Place thumb on the scanner")
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
                    
            saved_model = finger.get_fpdata('char')
            #TODO: send to database
            print(saved_model)
            saved_model_str = str(saved_model)
            print(saved_model_str)
            cipher_text, nonce, tag = self.EncryptAndProtectMessage(saved_model_str.encode())
            response = requests.post(endpoint + "/user/add", json = {"fingerprint" : cipher_text.hex(),
                                                                     "nonce" : nonce.hex(),
                                                                     "tag" : tag.hex()})
                    
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
        fingerprints = self.getAllFingerPrint()
        print("Fingerprints are")
        print(fingerprints)
        finger.empty_library()
        location = 0
        for fingerprint in fingerprints:
            print("Fingerprint is ")
            print(fingerprint.decode())
            print(type(fingerprint.decode()))
            
            test = fingerprint.decode().replace('[','')
            test = test.replace(']', '')
            test = test.replace(' ', '')
            testArr = test.split(',')
            print(testArr)
            valArr = []
            for val in testArr:
                valArr.append(int(val))
            print(valArr)
            print(type(valArr[0]))

            


            status = finger.send_fpdata(valArr, "char")
            print("status is " + str(status))
            print("templates")
            status = finger.read_templates()
            print(finger.templates)
            print("Creating model...", end="", flush=True)
            i = finger.create_model()
            if i == adafruit_fingerprint.OK:
                print("Created")
                
            else:
                if i == adafruit_fingerprint.ENROLLMISMATCH:
                    print("Prints did not match")
                else:
                    print("Other error")
            print("Storing model #%d..." % location, end="", flush=True)
            i = finger.store_model(location)
            if i == adafruit_fingerprint.OK:
                print("Stored")
            else:
                if i == adafruit_fingerprint.BADLOCATION:
                    print("Bad storage location")
                elif i == adafruit_fingerprint.FLASHERR:
                    print("Flash storage error")
            status = finger.read_templates()
            print(finger.templates)
            location = location + 1
        if self.get_fingerprint():
            print("Detected #", finger.finger_id, "with confidence", finger.confidence)
            fingerToSend = hashlib.sha256(fingerprints[finger.finger_id]).hexdigest()
            timestamp = time.time()
            piId = "61XpltdEav03rh"
            print(fingerToSend)
            response = requests.post(endpoint + '/checkin', json = { "hashedFingerprint" : fingerToSend,
                                                                 "timestamp" : timestamp,
                                                                 "hashedPiId" : piId})
        else:
            print("Finger not found")
        
    def error(self):
        print("Error")
        self.statusLabel.setStyleSheet("background-color : " + red)
        self.statusLabel.setText("Error")
        QApplication.processEvents()

    def getAllFingerPrint(self):
        res = []
        resp = requests.post(endpoint + "/getAll").json()
        for result in resp:
            print("result is")
            print(result)
            print("tag is " + result['tag'])
            tag = bytearray.fromhex(result['tag'])
            nonce = bytearray.fromhex(result['nonce'])
            fingerprint = bytearray.fromhex(result['fingerprint'])
            
            print(tag)
            print(nonce)
            print(fingerprint)
            
            plain_text = self.DecryptAndVerifyMessage(fingerprint, tag, nonce)
            res.append(plain_text)
        return res
    
    def EncryptAndProtectMessage(self, plain_text):

        # Encrypt the plaintext using AES in EAX mode
        cipher = AES.new(self._key, AES.MODE_EAX)
        nonce = cipher.nonce
        cipher_text, tag = cipher.encrypt_and_digest(plain_text)
        print(plain_text)
        print(nonce)
        print(tag)
        return cipher_text, nonce, tag
    
    def DecryptAndVerifyMessage(self, cipher_text, tag, nonce):

        # Decrypt the ciphertext using AES in EAX mode
        cipher = AES.new(self._key, AES.MODE_EAX, nonce=nonce)
        plain_text = cipher.decrypt(cipher_text)

        # Perform integrity check
        try:
            cipher.verify(tag)
        except ValueError:
            print("Key incorrect or message corrupted")
            raise ValueError("Key incorrect or message corrupted")

        return plain_text
    
    def get_fingerprint(self):
        """Get a finger print image, template it, and see if it matches!"""
        print("Waiting for image...")
        while finger.get_image() != adafruit_fingerprint.OK:
            pass
        print("Templating...")
        if finger.image_2_tz(1) != adafruit_fingerprint.OK:
            return False
        print("Searching...")
        if finger.finger_search() != adafruit_fingerprint.OK:
            return False
        return True
    
if __name__ == "__main__":
    app = QApplication([])
    widget = gui()
    widget.show()
    sys.exit(app.exec_())
