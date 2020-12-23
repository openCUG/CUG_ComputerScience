'''
@Author: your name
@Date: 2020-04-24 01:17:17
@LastEditTime: 2020-04-24 01:18:23
@LastEditors: Please set LastEditors
@Description: In User Settings Edit
'''
import numpy as np
import math as m
import matplotlib.pyplot as plt
plt.rcParams['font.sans-serif']=['SimHei'] #显示中文标签
plt.rcParams['axes.unicode_minus']=False

xarray=[]
yarray=[]
x=0
y=250
while x<= 60:
    xarray.append(x)
    yarray.append(y)
    y1=y+0.1*(0.00003*y*(25000-y))
    y1=y+0.1*(0.00003*y*(25000-y)+0.00003*y1*(25000-y1))
    y=y1
    x+=0.2
plt.scatter(xarray, yarray, alpha=0.6)
plt.show()