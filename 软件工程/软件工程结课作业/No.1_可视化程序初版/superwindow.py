from mainwindow import Ui_MainWindow
from pauseWindow import NewWindow
from PyQt5 import QtCore, QtGui, QtWidgets
from PyQt5.QtWidgets import *
from PyQt5.QtGui import *
from PyQt5.QtCore import *
import pytesseract
import matplotlib.pyplot as plt
from PIL import Image
import threading
import time
import difflib

class MainWindow(QMainWindow, Ui_MainWindow):
    def __init__(self, parent=None):
        super(MainWindow, self).__init__(parent)
        self.setupUi(self)
        # self.newWindow = NewWindow()
        self.path = 'aaa'
        self.acccuracy=[]
        self.acccuracyCHN=[]
        self.clickedLinked()
        self.show()

    def clickedLinked(self):
        self.choose.clicked.connect(self.chooseImage)
        self.exit.clicked.connect(self.exitBtnClicked)
        self.pushButton.clicked.connect(self.ocrRun)
        self.clear.clicked.connect(self.clearAll)
        self.analyze.clicked.connect(self.showAccuracy)
        self.checkAcc.clicked.connect(self.mainTestAccuracy)

    def clearAll(self):
        print('clear')
        self.image_1.clear()
        self.result.clear()

    def exitBtnClicked(self):
        exit()

    def printf(self, mypstr):   #动态显示信息
        self.result.append(mypstr)  # 在指定的区域显示提示信息
        self.cursor = self.result.textCursor()
        print(self.cursor)
        self.result.moveCursor(self.cursor.End)  # 光标移到最后，这样就会自动显示出来
        QtWidgets.QApplication.processEvents()  # 一定加上这个功能，不然有卡顿

    def chooseImage(self):
        print("hello")
        imgName, imgType = QFileDialog.getOpenFileName(self, "打开图片", "", "*.jpg;;*.png;;All Files(*)")
        self.path = imgName
        jpg = QtGui.QPixmap(imgName).scaled(self.image_1.width(), self.image_1.height())
        print(imgName,imgType)
        self.image_1.setPixmap(jpg)
        self.image_1.adjustSize()

    def ocrRun(self):
        image = Image.open(self.path)
        code = pytesseract.image_to_string(image, lang='chi_sim')
        code.replace(" ","")
        print(code)
        self.result.setText(code)

    def mainTestAccuracy(self):
        self.ocrTestAccuracy()
        self.ocrTestChineseAccuracy()

    def ocrTestAccuracy(self):
        self.acccuracy=[]
        for i in range(1,7):
            self.path = "D:\CodeProject\SoftwareEngineering\englishIMG\_{}.png".format(i)
            print(self.path)

            f = open(r"englishTXT\_{}.txt".format(i), encoding='UTF-8')
            data = f.read()
            data_list = data.split()
            print(data_list)

            jpg = QtGui.QPixmap(self.path).scaled(self.image_1.width(), self.image_1.height())

            self.result.append("<font color='green'>"+"读取图片{}".format(self.path)+"<font>")

            image = Image.open(self.path)
            code = pytesseract.image_to_string(image, lang='chi_sim')

            code_list = code.split()
            print(type(code))
            self.printf(code)
            sm = difflib.SequenceMatcher(None, data_list, code_list)
            smRatio = sm.ratio()
            self.acccuracy.append(smRatio)
            self.result.append("<font color='red'>" + "本次OCR识别精确度为{}".format(smRatio)+"<font>")
            print(smRatio)
            print(type(smRatio))

    def ocrTestChineseAccuracy(self):
        self.acccuracyCHN=[]
        for i in range(1,6):
            self.path = "D:\CodeProject\SoftwareEngineering\chinaIMG\_{}.png".format(i)
            print(self.path)

            f = open(r"chinaTXT\_{}.txt".format(i), encoding='UTF-8')
            data = f.read()

            jpg = QtGui.QPixmap(self.path).scaled(self.image_1.width(), self.image_1.height())

            self.result.append("<font color='green'>"+"读取图片{}".format(self.path)+"<font>")

            image = Image.open(self.path)
            code = pytesseract.image_to_string(image, lang='chi_sim')
            code = code.replace(" ","")

            print(type(code))
            self.printf(code)
            sm = difflib.SequenceMatcher(None, data, code)
            smRatio = sm.ratio()
            self.acccuracyCHN.append(smRatio)
            self.result.append("<font color='red'>" + "本次OCR识别精确度为{}".format(smRatio) + "<font>")
            print(smRatio)

    def showAccuracy(self):
        print(self.acccuracy)
        print(self.acccuracyCHN)
        self.newWindowAnalyze()

    def newWindowAnalyze(self):
        new_window = NewWindow(self.acccuracy,self.acccuracyCHN)
        new_window.show()
        new_window.exec_()