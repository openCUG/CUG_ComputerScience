'''
@Author: your name
@Date: 2020-04-22 16:53:51
@LastEditTime: 2020-04-22 17:11:34
@LastEditors: Please set LastEditors
@Description: In User Settings Edit
'''
import matplotlib.pyplot as plt
from pylab import mpl
import numpy as np
import pandas as pd
import math
from sympy import *
x=symbols("x")

def get_diff_table(X,Y):
    """
    得到插商表
    """
    n=len(X)
    A=np.zeros([n,n])
    
    for i in range(0,n):
        A[i][0] = Y[i]
    
    for j in range(1,n):
        for i in range(j,n):
            A[i][j] = (A[i][j-1] - A[i-1][j-1])/(X[i]-X[i-j])
    
    return A

def newton_interpolation(X,Y,x):
    """
    计算x点的插值
    """
    sum=Y[0]
    temp=np.zeros((len(X),len(X)))
    #将第一行赋值
    for i in range(0,len(X)):
        temp[i,0]=Y[i]
    temp_sum=1.0
    for i in range(1,len(X)):
        #x的多项式
        temp_sum=temp_sum*(x-X[i-1])
        #计算均差
        for j in range(i,len(X)):
            temp[j,i]=(temp[j,i-1]-temp[j-1,i-1])/(X[j]-X[j-i])
        sum+=temp_sum*temp[i,i] 
    return sum

X=[0,1,2,4]
Y=[1,9,23,3]
A = get_diff_table(X,Y)
df = pd.DataFrame(A)
print(df)
print(newton_interpolation(X,Y,3))

# xs=np.linspace(np.min(X),np.max(X),1000,endpoint=True)
# ys=[]
# for x in xs:
#     ys.append(newton_interpolation(X,Y,x))
# plt.title("newton_interpolation")
# plt.plot(X,Y,'s',label="original values")#蓝点表示原来的值
# plt.plot(xs,ys,'r',label='interpolation values')#插值曲线
# plt.xlabel('x')  
# plt.ylabel('y')  
# plt.legend(loc=4)#指定legend的位置右下角