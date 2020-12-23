from numpy import *
import math as m
#from sympy import *
#x = Symbol("x")

def fun(x):
    a = m.exp(x)*3*x-m.exp(x)*m.exp(x)
    return a

def difun(x):
    a = m.exp(x)*(3*x+3-2*m.exp(x))
    return a

def Hermite(x,y,m,x0):
    a=len(x)
    b=len(x0)
    y0=[0]*len(x0)
    add_xj_xk=0 #连加
    mul_x0_xk=1 #连乘
    add_h2n1x=0 #近似值

    for i in range(b):
        add_h2n1x=0
        for j in range(a):
            mul_x0_xk=1
            add_xj_xk=0
            for k in range(a):
                if j != k:
                    add_xj_xk+=1/(x[j]-x[k])
                    mul_x0_xk*=((x0[i]-x[k])/(x[k]-x[j]))
            add_h2n1x+=(y[j]*(1-(2*(x0[i]-x[j])*add_xj_xk))*(mul_x0_xk*mul_x0_xk))+(m[j]*(x0[i]-x[j])*(mul_x0_xk*mul_x0_xk))

        y0[i]=add_h2n1x
    return y0

def main():
    x=[1.00,1.05]
    y=[]
    m=[]

    for i in x:
        y.append(fun(i))
        m.append(difun(i))
    #n = int(input("请输入差值点个数"))
    n=1
    x0=[]
    #Input=float(input("请输入横坐标"))

    #此处默认只输入一个节点1.03，取消注释便可改为交互式

    Input=1.03
    x0.append(Input)
    y0=Hermite(x,y,m,x0)
    print("得到：{}".format(y0))
    for i in y0:
        print("误差为{}".format(i-0.8093))
    
if __name__ == "__main__":
    main()
