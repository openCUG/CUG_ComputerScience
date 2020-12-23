'''
@Author: your name
@Date: 2020-04-23 23:11:46
@LastEditTime: 2020-04-23 23:16:36
@LastEditors: Please set LastEditors
@Description: In User Settings Edit
'''
import numpy as np
import math as m
from sympy import *
import matplotlib.pyplot as plt
plt.rcParams['font.sans-serif']=['SimHei'] #显示中文标签
plt.rcParams['axes.unicode_minus']=False
x = Symbol("x")
y = Symbol("y")
t = Symbol("t")

x=3000
y=120
t=0
xArray=[]
yArray=[]
tArray=[]
while t<=5:
    tArray.append(t)
    t+=0.2
    x=x+0.2*(2*x-0.02*x*y)
    xArray.append(x)
    y=y+0.2*(0.0002*x*y-0.8*y)
    yArray.append(y)
plt.figure(12)
plt.subplot(212)
plt.scatter(xArray, yArray, alpha=0.6)
plt.subplot(221)
plt.scatter(tArray, xArray, alpha=0.6)
plt.subplot(222)
plt.scatter(tArray, yArray, alpha=0.6)
plt.show()