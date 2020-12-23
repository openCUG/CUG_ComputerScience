'''
@Author: your name
@Date: 2020-04-22 10:52:02
@LastEditTime: 2020-04-22 11:00:36
@Description: In User Settings Edit
'''
import math
def f(x):
    return x*x-2*x

def secant_method(x0,x1,ep=0.01,max=100):
    print("精度为{}".format(ep))
    for i in range(max):
        if(math.fabs(x1-x0)<=ep):
            return i,x0
        else:
            x2=x1-f(x1)*(x1-x0)/(f(x1)-f(x0))
            x0=x1
            x1=x2

def main():
    x0=-0.875
    x1=-0.75
    count,x = secant_method(x0,x1)
    print("迭代次数{}".format(count))
    print("最终结果是{}".format(x))

if __name__ == "__main__":
    main()