'''
@Author: your name
@Date: 2020-04-23 10:25:12
@LastEditTime: 2020-05-04 15:55:07
@LastEditors: Please set LastEditors
@Description: In User Settings Edit
'''

from math import *
from sympy import *
x = Symbol("x")

def f(x):
    a=sqrt(4*x-x*x)
    return a

def FSimpson():
    l = float(input("请输入左边界"))
    r = float(input("请输入右边界"))
    N = int(input("平分为多少段"))
    h = (r - l) / N
    x=l+h/2
    s1=f(x)
    s2=0
    for k in range(1,N):
        s1+=f(l+k*h+h/2)
        s2+=f(l+k*h)
    s2=h*(f(l)+4*s1+2*s2+f(r))/6
    print("得出：",round(s2,4))

def main():
    FSimpson()

if __name__ == "__main__":
    main()