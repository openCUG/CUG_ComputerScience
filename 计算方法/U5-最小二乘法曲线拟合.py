# -*- coding: utf-8 -*-
"""
Created on Sat May  2 22:39:02 2020

@author: HUAWEI
"""

import numpy as np  
import matplotlib.pyplot as plt 
  
# y = 2 + 3x + 4x^2 
#X = np.arange(0, 5, 0.1)  
#Z = [2 + 3 * x + 4 * x ** 2 for x in X]  
#Y = np.array([np.random.normal(z,3) for z in Z]) 
X = np.array([0.75,0.86,0.96,1.08,1.12,1.26,1.35,1.51,1.55,1.60,1.63,1.67,1.71,1.78,1.85])
Y = np.array([10,12,15,17,20,27,35,41,48,50,51,54,59,66,75])
#plt.plot(X, Y, 'ro')  
#plt.show()
# 生成系数矩阵A 
def gen_coefficient_matrix(X, Y):  
 N = len(X) 
 m = 3
 A = [] 
 # 计算每一个方程的系数 
 for i in range(m): 
  a = [] 
  # 计算当前方程中的每一个系数 
  for j in range(m): 
   a.append(sum(X ** (i+j))) 
  A.append(a) 
 return A 
  
# 计算方程组的右端向量b 
def gen_right_vector(X, Y):  
 N = len(X) 
 m = 3
 b = [] 
 for i in range(m): 
  b.append(sum(X**i * Y)) 
 return b 
  
A = gen_coefficient_matrix(X, Y)  
b = gen_right_vector(X, Y) 
  
a0, a1, a2 = np.linalg.solve(A, b)
_X = np.arange(0, 5, 0.1)  
_Y = np.array([a0 + a1*x + a2*x**2 for x in _X]) 
  
plt.plot(X, Y, 'ro', _X, _Y, 'b', linewidth=2)  
plt.title("y = {} + {}x + {}$x^2$ ".format(a0, a1, a2))  
plt.show()