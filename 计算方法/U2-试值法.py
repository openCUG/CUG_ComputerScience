import math

#字符型转换成数字
a=eval(input('请输入区间left端点：'))
b=eval(input('请输入区间right端点：'))
n=eval(input('请输入区间保存几位小数：'))
c=1
#记录迭代次数
i=0
#精度
delta = 0.5 * 10 **(-n)
#公式
def formular(temp):
    result=temp**3-3*temp-1
    return result

#试值法
while abs(formular(c))>0.1**n:
    c=b-(formular(b)*(b-a))/(formular(b)-formular(a))
    if abs(formular(c))<0.0001:
        break
    elif (delta > b-a):
        break
    elif formular(a)*formular(c)<0:
        b=c
        i=i+1
    else:
        a=c
        i=i+1

#迭代次数
print("迭代了{}次".format(i))
#结果
print("x=",round(c,n))