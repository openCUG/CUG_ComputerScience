import matplotlib.pyplot as plt
from sympy import *
import numpy as np
import pandas as pd
import math as m

plt.rcParams['font.sans-serif'] = ['KaiTi']  # 指定默认字体
plt.rcParams['axes.unicode_minus'] = False  # 解决保存图像是负号'-'显示为方块的问题

y = Symbol("y")
x = np.arange(-2.5, 2.5, 0.1)
y = np.arange(-2.5, 2.5, 0.1)

xpoint = [-1, 0, 1, 2]
ypoint = [15, 5, 1, -3]
h=0.1
#index=-2
x1=[]
y1=[]
yf=[]
xf=[]
yb=[]
xb=[]
subitem = []
answer = []

def fun(x):
    fun = x ** 4 - 3 * x ** 3 + 2 * x ** 2 - 4 * x + 5
    return fun


def fun2(x):
    val = 4*x**3 - 9*x**2 + 4*x - 4
    return val

#fun3是导数余项
def fun3(y):
    val = 4.0*y**3 - 5.99982*y**2 - 2.0003*y + 2.00009
    return val

#插值导数
def fun4(y):
    val = -3.00018*y**2 + 6.0003*y - 6.00009
    return val

def Lagrange(y):
    for j in xpoint:
        val = coe = 1
        for i in xpoint:
            if i == j:
                continue
            else:
                key = j-i
                val *= key
                term = y-i
                coe *= term
        subitem.append(round(1/val,5)*coe)

    count = 0
    for n in range(0,len(ypoint)):
        a=ypoint[n]*subitem[n]
        #print(a)
        answer.append(a)
    num=0
    for n in answer:
        num+=n
    
    return num

def forward_back():
    index=-2
    while index>=-2 and index<2.1:
        x1.append(round(index,3))
        y1.append(fun(round(index,3)))
        index+=0.1
    for i in range(1,len(y1)-1):
        a=(y1[i]-y1[i-1])/h
        xb.append(x1[i])
        yb.append(a)
    for i in range(0,len(y1)-1):
        a=(y1[i+1]-y1[i])/h
        xf.append(x1[i])
        yf.append(a)


def Paint():
    forward_back()
    plt.xlim((-2, 2))
    plt.ylim((-20, 1))
    plt.title("对比图(h取0.1)")
    plt.plot(x, fun2(x), color='red', linewidth=2.0, linestyle='-', label='导数')
    plt.plot(y, fun4(y), color='blue', linewidth=2.0, linestyle='-', label='插值导数')
    plt.plot(xf, yf, color='purple', linewidth=2.0, linestyle='-', label='向前差分')
    plt.plot(xb, yb, color='green', linewidth=2.0, linestyle='-', label='向后差分')
    plt.legend(loc=4)  # 指定legend的位置右下角
    plt.show()

def main():
    Paint()

if __name__ == '__main__':
    main()