import numpy as np
import math as m
from sympy import *
x = Symbol("x")

xArray=[1.00,1.02,1.04,1.06]
aArray=[]
bArray=[]
cArray=[]

def fun(x):
    k=m.exp(x)
    return k*(3*x-k)

def Lagrange(array,x):
    for i in range(len(array)):
        index=xArray[i]
        a=1
        for j in range(len(array)):
            if i==j:
                continue
            else:
                a*=xArray[i]-xArray[j]
        a=1/a
        aArray.append(a)
    #print(aArray)
    for i in range(len(array)):
        b=1
        for j in range(len(array)):
            if i==j:
                continue
            else:
                b*=x-xArray[j]
        bArray.append(b)
    #print(bArray)
    for i in range(0,len(array)):
        cArray.append(fun(xArray[i])*aArray[i]*bArray[i])
    count=0
    for i in range(0,len(array)):
        count+=cArray[i]
    #print(count)

    return count

def main():
    answer=Lagrange(xArray,1.03)
    print("拉格朗日得出：{}".format(answer))
    print("误差为{}".format(round(answer-fun(1.03),7)))

if __name__ == '__main__':
    main()