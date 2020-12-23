'''
@Author: your name
@Date: 2020-04-23 01:04:54
@LastEditTime: 2020-04-23 10:16:05
@LastEditors: Please set LastEditors
@Description: In User Settings Edit
'''
import math as m
from sympy import *
x=symbols("x")

def f(x):
    if x==0:
        return 0.8771925739840309
    else:
        a=m.sin(x)/x
        return a

#梯形公式
def Trapezoid(a,b):
    p1=b-a
    p2=f(a)+f(b)
    T=(p1+p2)/2
    print("梯形公式得出：",T)

#Simpson公式
def Simpson(a,b):
    c=(a+b)/2
    p1=b-a
    p2=f(a)+f(b)
    T=(p1+p2)/2
    Y=p1*(p2+4*f(c))/6
    print("Simpson公式得出：",Y)

#3/8-Simpson公式
def te_Simpson(a,b):
    p1=b-a
    c=(2*a+b)/3
    d=(2*b+a)/3
    p2=f(a)+f(b)+3*f(c)+3*f(d)
    T=p1*p2/8
    print("3/8 Simpson公式得出：",T)

#Cotes公式
def Cotes(a,b):
    h=(b-a)/4
    pa=b-a
    pb=7*f(a)
    pc=32*f(a+h)
    pd=12*f(a+2*h)
    pe=32*f(a+3*h)
    pf=7*f(b)
    T=pa*(pb+pc+pd+pe+pf)/90
    print("Cotes公式得出：",T)



def main():
    a=float(input("请输入左端点"))
    b=float(input("请输入右端点"))
    Trapezoid(a,b)
    Simpson(a,b)
    te_Simpson(a,b)
    Cotes(a,b)


if __name__ == "__main__":
    main()