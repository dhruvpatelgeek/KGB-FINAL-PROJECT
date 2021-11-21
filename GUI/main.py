# This Python file uses the following encoding: utf-8
import sys
import os
import time

from PyQt5 import uic,QtGui
from PyQt5.QtWidgets import QApplication, QWidget
from PyQt5.QtCore import QFile
#from PyQt5.QtUiTools import QUiLoader

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
         self.statusLabel.setText("Place thumb on the scanner")
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
