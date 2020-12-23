import matplotlib.pyplot as plt
import numpy as np
import math as m
from sympy import *

plt.rcParams['font.sans-serif']=['SimHei'] #显示中文标签
plt.rcParams['axes.unicode_minus']=False

x = Symbol("x")

xpot=[0.75,0.86,0.96,1.08,1.12,1.26,1.35,1.51,1.55,1.60,1.63,1.67,1.71,1.78,1.85]
ypot=[10,12,15,17,20,27,35,41,48,50,51,54,59,66,75]
x = np.arange(0, 2, 0.001)

pfit = np.polyfit(xpot , ypot , 2) #2阶，可以修改
y_fun = np.poly1d(pfit)


def main():
    plt.xlim((0.5, 2))
    plt.ylim((5, 100))
    plt.title("对比图(h取0.1)")
    plt.scatter(xpot, ypot, alpha=0.6)
    plt.plot(x,y_fun(x) , color='red', linewidth=2.0, linestyle='-', label='NH')
    plt.legend(loc=4)  # 指定legend的位置右下角
    plt.show()

if __name__ == '__main__':
    main()