'''
@Author: your name
@Date: 2020-04-17 00:28:13
@LastEditTime: 2020-05-04 15:23:36
@LastEditors: Please set LastEditors
@Description: In User Settings Edit
'''
import math as m

def f(x):
    a=m.sin(x)-x**2
    return a

def cut():
    e=0.00001
    a = 0.00000
    b = 1.00000
    d=a+0.618*(b-a)
    f2=f(d)
    c=a+0.382*(b-a)
    f1=f(c)

    t=abs(b-a)

    while t>e:
        p=(a+b)/2
        if f(c)>f(d):
            b=d
            d=c
            f2=f1
            c=a+0.382*(b-a)
            f1=f(c)
            #print(round(a,7),round(b,7))
            t = abs(b - a)
        elif f(c)==f(d):
            a=c
            b=d
            d=a+0.618*(b-a)
            f2=f(d)
            c=a+0.382*(b-a)
            f1=f(c)
            #print(round(a,7),round(b,7))
            t = abs(b - a)
        elif f(c)<f(d):
            a=c
            c=d
            f1=f2
            d=a+0.618*(b-a)
            f2=f(d)
            #print(round(a,7),round(b,7))
            t = abs(b - a)
    print("最终得出：")
    print(round(a,7),round(b,7))

def main():
    cut()

if __name__ == '__main__':
    main()