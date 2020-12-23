import math

# 定义函数
def func(x):
    return x*x*x - 3*x - 1

# 给定根的区间，通过不断判断区间中点的函数值是否小于误差，还有区间端点的精度够不够，从而决定是不是拿中点当解
def findAnswer(a, b):  # 输入解的端点
    # 正常这里要检查端点，先忽略了
    if func(a) * func(b) > 0:
        print('所选区间有误，请更正！')  # 很大程度会是错的
        return None
    middle = (a + b) / 2
    while (b-a) > 1e-5 or math.fabs(func(middle)) > 1e-5:  # 一方面是区间要小于10的负五，取值的差要衡量跟0的距离
        # 更新区间
        if func(middle) * func(a) < 0:
            b = middle
        elif func(middle) * func(b) < 0:
            a = middle
        else:
            print('所选区间不止一个根')
        middle = (a + b) / 2  # 更新区间
    return middle


def main():
    #a = eval(input('请输入区间left端点：'))
    #b = eval(input('请输入区间right端点：'))
    a=1
    b=2
    result = findAnswer(a, b)
    print('x=', result)
    print("f(x)=",func(result))


if __name__ == '__main__':
    main()