'''
@Author: your name
@Date: 2020-04-22 01:17:04
@LastEditTime: 2020-05-04 14:56:09
@LastEditors: Please set LastEditors
@Description:注意：在区间内满足误差小于0.01的根
'''
from sympy import *
import random
x=symbols("x")

func = x*x-2*x
Derivatives = diff(func,x)

begin=-1
end=0.5

MAXSTEP = 100
step_count = 0

x0=-0.25
temp = func.subs(x,x0)

while step_count<MAXSTEP and abs(temp)>0.01:
    x0 = x0-(temp/(Derivatives.subs(x,x0)))
    temp = func.subs(x,x0)
    step_count+=1

print(x0)
print(step_count)