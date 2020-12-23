from PyQt5.QtWidgets import *
from PyQt5.QtGui import *
from PyQt5.QtCore import *

class PaintWidget(QWidget):

    def paintEvent(self, event):
        painter = QPainter(self)
        painter.setRenderHint(QPainter.Antialiasing, True)  # 消除锯齿
        side = min(self.width(), self.height())
        # 设置视窗矩形区域device coordinate system
        painter.setViewport((self.width() - side) / 2, (self.height() - side) / 2, side, side)
        # logical coordinate system.
        painter.setWindow(0, 0, 200, 200)
        #设置绘画
        painter.begin(self)
        self.drawMap(painter)
        painter.end()

    def drawMap(self,qp):
        qp.setRenderHint(QPainter.Antialiasing)
        qp.setBrush(Qt.gray)
        qp.setPen(Qt.gray)
        qp.drawLine(-18, 20, -32, 35)
        qp.drawLine(-18, 20, 16, 68)
        qp.drawLine(-32, 57, 16, 68)
        qp.drawLine(35, 68, 66, 72)
        qp.drawLine(66, 72, 110, 136)
        qp.drawLine(-35, 38, -43, 55)
        qp.drawLine(-43, 55, -40, 80)
        qp.drawLine(-40, 80, -14, 103)
        qp.drawLine(-14, 109, -12, 123)
        qp.drawLine(-12, 129, -12, 147.5)
        qp.drawLine(-9, 148, 33, 148)
        qp.drawLine(39, 148, 69, 125)
        qp.drawLine(36, 102, 69, 125)
        qp.drawLine(36, 144, 36, 102)
        qp.drawLine(36, 98, 20, 70)
        qp.drawLine(74.5, 125.5, 110, 136)
        qp.drawLine(90, 174.5, 110, 141)
        qp.drawLine(110, 136,152,125)
        qp.drawLine(178, 125, 195, 127)
        qp.drawLine(199, 129, 206,162)
        qp.drawLine(153, 121, 184, 84)
        qp.drawLine(174, 61, 184, 84)
        qp.drawLine(170, 57, 135, 40)