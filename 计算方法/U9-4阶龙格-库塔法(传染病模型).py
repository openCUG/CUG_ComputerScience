'''
@Author: your name
@Date: 2020-04-24 22:17:51
@LastEditTime: 2020-04-24 22:18:36
@LastEditors: Please set LastEditors
@Description: In User Settings Edit
'''
import numpy as np
import math as m
from sympy import *
import matplotlib.pyplot as plt
plt.rcParams['font.sans-serif']=['SimHei'] #显示中文标签
plt.rcParams['axes.unicode_minus']=False
# x = Symbol("x")
# y = Symbol("y")

h=0.2
k=0.00003
L=25000

def f(y):
    a=k*y*(L-y)
    return a
print(f(250))

xarray=[]
yarray=[]
def main():
    x=0
    y=250
    while x<=60:
        xarray.append(x)
        yarray.append(y)
        k1=h*f(y)
        a=y+0.5*k1
        k2=h*f(a)
        b=y+0.5*k2
        k3=h*f(b)
        c=y+k3
        k4=h*f(c)
        y=y+(k1+2*k2+2*k3+k4)/6
        x+=h

    plt.scatter(xarray, yarray,color='green', alpha=0.6)
    plt.show()

if __name__ == "__main__":
    main()