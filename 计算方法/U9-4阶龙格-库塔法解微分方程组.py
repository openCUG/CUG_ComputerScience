'''
@Author: your name
@Date: 2020-05-04 00:34:36
@LastEditTime: 2020-05-04 01:07:20
@LastEditors: Please set LastEditors
@Description: In User Settings Edit
'''
import numpy as np
import math as m
from sympy import *
import matplotlib.pyplot as plt
plt.rcParams['font.sans-serif']=['SimHei'] #显示中文标签
plt.rcParams['axes.unicode_minus']=False

xarray=[]
yarray=[]
array=[]

def f(x,y):
    a=x+2*y
    return a

def g(x,y):
    a=3*x+2*y
    return a

def RK4():
    h=0.02
    a=0
    x=6
    y=4
    while a<=0.2:
        array.append(a)
        xarray.append(x)
        yarray.append(y)
        a+=h

        f1=f(x,y) #第一步
        m1=x+f1*h/2
        g1=g(x,y)
        n1=y+g1*h/2

        f2=f(m1,n1) #第二步
        m2=x+f2*h/2
        g2=g(m1,n1)
        n2=y+g2*h/2

        f3=f(m2,n2) #第三步
        m3=x+f3*h
        g3=g(m2,n2)
        n3=y+g3*h

        f4=f(m3,n3) #第四步
        g4=g(m3,n3)

        x=x+(f1+2*f2+2*f3+f4)*h/6
        y=y+(g1+2*g2+2*g3+g4)*h/6

def main():
    RK4()
    for i in xarray:
        print(i)
    print("-------------")
    for i in yarray:
        print(i)
    plt.figure(12)
    plt.subplot(212)
    plt.scatter(xarray, yarray, alpha=0.6)
    plt.subplot(221)
    plt.scatter(array, xarray, alpha=0.6)
    plt.subplot(222)
    plt.scatter(array, yarray, alpha=0.6)
    plt.show()

if __name__ == "__main__":
    main()

