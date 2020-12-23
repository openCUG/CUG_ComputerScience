'''
@Author: your name
@Date: 2020-05-01 10:40:46
@LastEditTime: 2020-05-01 11:04:20
@LastEditors: Please set LastEditors
@Description: In User Settings Edit
'''
import math as m
import numpy as np

def f(x):
    return x+5

def Gauss():
    l=float(input("请输入左端点"))
    r=float(input("请输入右端点"))
    if l==-1 and r==1:
        print("得到：",2*f(0))
    else:
        print("尚未开发")

def main():
    Gauss()

if __name__ == "__main__":
    main()


