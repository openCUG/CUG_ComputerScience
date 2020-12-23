'''
@Author: your name
@Date: 2020-04-23 23:02:02
@LastEditTime: 2020-04-23 23:06:07
@LastEditors: Please set LastEditors
@Description: In User Settings Edit
'''
import matplotlib.pyplot as plt
import numpy as np
from sympy import *
x = symbols('x')

plt.rcParams['font.sans-serif'] = ['KaiTi']  # 指定默认字体
plt.rcParams['axes.unicode_minus'] = False  # 解决保存图像是负号'-'显示为方块的问题

xrange = np.arange(-1, 61, 0.2)
y = np.arange(100, 26000)
#p1=4.268e-05*x - 0.007422*x**6 + 0.4591*x**5 - 10.87*x**4 + 5.156*x**3 + 3186*x**2 - 4980

def Euler(L, k, h):
    x1=[]
    y1=[]
    xrange = 0
    count = 0
    y = 250
    sum=0
    while xrange <= 60:
        count += 1
        sum+=y
        xrange += h
        y = y+h*k*y*(L-y)
        x1.append(xrange)
        y1.append(y)
        if count%20==0:
            print("第{}次迭代".format(count))
            print("得到{}".format(y))
        plt.scatter(xrange, y)
    print("----------------------")
    print("最终结果为{}".format(format(y)))
    print("平均有{}人感染".format(int(sum/count)))

    #拟合
    xplace=np.arange(1.5, 60, 0.2)
    x1=np.array(x1)
    y1=np.array(y1)
    z1 = np.polyfit(x1,y1,6)
    p1= np.poly1d(z1)
    #print("拟合方程为{}".format(p1))
    yvals=np.polyval(z1,xplace)
    #积分
    print("通过积分均值定理估计出感染人数为{}".format(int(integrate(p1(x), (x, 1.5, 60))/60)))
    #绘图
    plot2 = plt.plot(xplace,yvals,'r',label='polyfit values')
    plt.show()

def main():
    Euler(25000, 0.00003, 0.2)

if __name__ == "__main__":
    main()