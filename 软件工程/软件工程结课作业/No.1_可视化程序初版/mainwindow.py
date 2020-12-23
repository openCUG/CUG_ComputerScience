# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'mainwindow.ui'
#
# Created by: PyQt5 UI code generator 5.14.2
#
# WARNING! All changes made in this file will be lost!


from PyQt5 import QtCore, QtGui, QtWidgets


class Ui_MainWindow(object):
    def setupUi(self, MainWindow):
        MainWindow.setObjectName("MainWindow")
        MainWindow.resize(614, 548)
        self.centralwidget = QtWidgets.QWidget(MainWindow)
        self.centralwidget.setObjectName("centralwidget")
        self.image_1 = QtWidgets.QLabel(self.centralwidget)
        self.image_1.setGeometry(QtCore.QRect(30, 30, 461, 211))
        self.image_1.setObjectName("image_1")
        self.result = QtWidgets.QTextBrowser(self.centralwidget)
        self.result.setGeometry(QtCore.QRect(30, 260, 461, 231))
        self.result.setObjectName("result")
        self.layoutWidget = QtWidgets.QWidget(self.centralwidget)
        self.layoutWidget.setGeometry(QtCore.QRect(510, 320, 77, 170))
        self.layoutWidget.setObjectName("layoutWidget")
        self.verticalLayout = QtWidgets.QVBoxLayout(self.layoutWidget)
        self.verticalLayout.setContentsMargins(0, 0, 0, 0)
        self.verticalLayout.setObjectName("verticalLayout")
        self.analyze = QtWidgets.QPushButton(self.layoutWidget)
        self.analyze.setObjectName("analyze")
        self.verticalLayout.addWidget(self.analyze)
        self.checkAcc = QtWidgets.QPushButton(self.layoutWidget)
        self.checkAcc.setObjectName("checkAcc")
        self.verticalLayout.addWidget(self.checkAcc)
        self.choose = QtWidgets.QPushButton(self.layoutWidget)
        self.choose.setObjectName("choose")
        self.verticalLayout.addWidget(self.choose)
        self.pushButton = QtWidgets.QPushButton(self.layoutWidget)
        self.pushButton.setObjectName("pushButton")
        self.verticalLayout.addWidget(self.pushButton)
        self.clear = QtWidgets.QPushButton(self.layoutWidget)
        self.clear.setObjectName("clear")
        self.verticalLayout.addWidget(self.clear)
        self.exit = QtWidgets.QPushButton(self.layoutWidget)
        self.exit.setObjectName("exit")
        self.verticalLayout.addWidget(self.exit)
        MainWindow.setCentralWidget(self.centralwidget)
        self.menubar = QtWidgets.QMenuBar(MainWindow)
        self.menubar.setGeometry(QtCore.QRect(0, 0, 614, 23))
        self.menubar.setObjectName("menubar")
        MainWindow.setMenuBar(self.menubar)
        self.statusbar = QtWidgets.QStatusBar(MainWindow)
        self.statusbar.setObjectName("statusbar")
        MainWindow.setStatusBar(self.statusbar)

        self.retranslateUi(MainWindow)
        QtCore.QMetaObject.connectSlotsByName(MainWindow)

    def retranslateUi(self, MainWindow):
        _translate = QtCore.QCoreApplication.translate
        MainWindow.setWindowTitle(_translate("MainWindow", "MainWindow"))
        self.image_1.setText(_translate("MainWindow", "                                   原始图片"))
        self.analyze.setText(_translate("MainWindow", "精确度分析"))
        self.checkAcc.setText(_translate("MainWindow", "测算精确度"))
        self.choose.setText(_translate("MainWindow", "选择"))
        self.pushButton.setText(_translate("MainWindow", "识别"))
        self.clear.setText(_translate("MainWindow", "清除"))
        self.exit.setText(_translate("MainWindow", "退出"))
