'''
@Author: your name
@Date: 2020-04-23 10:23:32
@LastEditTime: 2020-05-04 15:53:12
@LastEditors: Please set LastEditors
@Description: In User Settings Edit
'''
from math import *
from sympy import *
x = Symbol("x")

def f(x):
    a=sqrt(4*x-x*x)
    return a

def Tfun():
    #l=float(input("请输入左边界"))
    l=0
    #r=float(input("请输入右边界"))
    r=2
    #N=int(input("平分为多少段"))
    N=10
    h=(r-l)/N
    T=0
    for k in range(1,N):
        T=T+f(l+k*h)
        #print(T)
    T=h*(f(l)+2*T+f(r))/2
    print("把函数中的input函数的注释接触就可以改编成交互形")
    print("得出：",round(T,4))

def main():
    Tfun()

if __name__ == "__main__":
    main()