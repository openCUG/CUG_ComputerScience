'''
@Author: your name
@Date: 2020-05-01 10:56:18
@LastEditTime: 2020-05-01 12:12:52
@LastEditors: Please set LastEditors
@Description: In User Settings Edit
'''
import math as m
import numpy as np

def f(x):
    return m.sin(x)/x

def Gauss():
    l=float(input("请输入左端点"))
    r=float(input("请输入右端点"))
    if l==-1 and r==1:
        print("得到：",f(-1/(3**0.5))+f(1/(3**0.5)))
    elif l==0 and r==1:
        t=-1/(3**0.5)
        x=(t+1)/2
        x1=f(x)

        t=1/(3**0.5)
        x=(t+1)/2
        x2=f(x)
        print("得到：",(x1+x2)/2)
    else:
        print("抱歉，尚未开发")

def main():
    Gauss()

if __name__ == "__main__":
    main()