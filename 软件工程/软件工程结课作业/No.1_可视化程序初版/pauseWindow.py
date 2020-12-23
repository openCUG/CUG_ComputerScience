from PyQt5.QtCore import *
from PyQt5.QtGui import *
from PyQt5.QtWidgets import *
from matplotlib.backends.backend_qt5agg import FigureCanvasQTAgg as FigureCanvas
import matplotlib.pyplot as plt
import numpy as np
import sys
import scipy.integrate as spi


class NewWindow(QDialog):
    def __init__(self,a,b):
        super().__init__()
        self.setWindowTitle('新窗口')
        self.resize(650, 450)
        self.dataA = a
        self.dataB = b
        self.initUI()
        self.showTime()

    def initUI(self):
        plt.rcParams['font.sans-serif'] = ['SimHei']
        plt.rcParams['axes.unicode_minus'] = False
        self.x=[]   #数据列表，之后会用来添加数据，也可以直接用dataframe
        #图像模块
        self.figure = plt.figure()  #配置画布
        self.canvas = FigureCanvas(self.figure)

        layout = QBoxLayout(QBoxLayout.TopToBottom)
        #在layout中添加各个控件
        layout.addWidget( self.canvas )
        self.setLayout(layout)

    #测试函数,使用数据
    def showTime(self):
        ax = self.figure.add_axes([0.1, 0.1, 0.8, 0.8])
        ax.plot(self.dataA,label="英文识别精确度")
        ax.plot(self.dataB,label="中文识别精确度")
        ax.set_xlabel('次数')
        ax.set_ylabel('精确度')
        ax.legend()
        self.canvas.draw()