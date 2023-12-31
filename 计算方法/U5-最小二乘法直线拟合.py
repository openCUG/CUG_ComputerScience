import numpy as np  
import matplotlib.pyplot as plt 
  
# 在直线 y = 3 + 5x 附近生成随机点 
#X = np.arange(0, 5, 0.1)  
#Z = [3 + 5 * x for x in X]  
#Y = [np.random.normal(z, 0.5) for z in Z] 
X = np.array([1.36,1.73,1.95,2.28])  
Y = np.array([14.094,16.844,18.475,20.963])
#plt.plot(X, Y, 'ro')  
#plt.show()
def linear_regression(x, y):  
 N = len(x) 
 sumx = sum(x) 
 sumy = sum(y) 
 sumx2 = sum(x**2) 
 sumxy = sum(x*y) 
  
 A = np.mat([[N, sumx], [sumx, sumx2]]) 
 b = np.array([sumy, sumxy]) 
  
 return np.linalg.solve(A, b) 
  
a0, a1 = linear_regression(X, Y)
_X = [0, 5]  
_Y = [a0 + a1 * x for x in _X] 
  
plt.plot(X, Y, 'ro', _X, _Y, 'b', linewidth=2)  
plt.title("y = {} + {}x".format(a0, a1))  
plt.show()