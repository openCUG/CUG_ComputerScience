'''
@Author: your name
@Date: 2020-04-23 11:21:46
@LastEditTime: 2020-05-04 15:57:51
@LastEditors: Please set LastEditors
@Description: In User Settings Edit
'''
import numpy as np
import math as m

def func(x):
    a=m.sqrt(4*x-x*x)
    return a

class Romberg:
    def __init__(self, integ_dowlimit, integ_uplimit):
        '''
        初始化积分上限integ_uplimit和积分下限integ_dowlimit
        输入一个函数，输出函数在积分上下限的积分
        '''
        self.integ_uplimit = integ_uplimit
        self.integ_dowlimit = integ_dowlimit



    def calc(self):
        '''
        计算Richardson外推算法的四个序列
        '''
        t_seq1 = np.zeros(5, 'f')
        s_seq2 = np.zeros(4, 'f')
        c_seq3 = np.zeros(3, 'f')
        r_seq4 = np.zeros(2, 'f')
        # 循环生成hm间距序列
        hm = [(self.integ_uplimit - self.integ_dowlimit) / (2 ** i) for i in range(0,5)]
        #print(hm)
        # 循环生成t_seq1
        fa = func(self.integ_dowlimit)
        fb = func(self.integ_uplimit)

        t0 = (1 / 2) * (self.integ_uplimit - self.integ_dowlimit) * (fa+fb)
        t_seq1[0] = t0

        for i in range(1, 5):
            sum = 0
            # 多出来的点的累加和
            for each in range(1, 2**i,2):
                sum =sum + hm[i]*func( self.integ_dowlimit+each * hm[i])#计算两项值
            temp1 = 1 / 2 * t_seq1[i - 1]
            temp2 =sum
            temp =  temp1 + temp2
            # 求t_seql的1-4位
            t_seq1[i] = temp
        #print('T序列：'+ str(list(t_seq1)))
        # 循环生成s_seq2
        s_seq2 = [round((4 * t_seq1[i + 1] - t_seq1[i]) / 3,6) for i in range(0, 4)]
        #print('S序列：' + str(list(s_seq2)))
        # 循环生成c_seq3
        c_seq3 = [round((4 ** 2 * s_seq2[i + 1] - s_seq2[i]) / (4 ** 2 - 1),6) for i in range(0, 3)]
        #print('C序列：' + str(list(c_seq3)))
        # 循环生成r_seq4
        r_seq4 = [round((4 ** 3 * c_seq3[i + 1] - c_seq3[i]) / (4 ** 3 - 1),6) for i in range(0, 2)]

        r_seq4=np.array(r_seq4)
        print("得到：{}".format(r_seq4[len(r_seq4)-1]))


def main():
    rom = Romberg(0, 2)
    rom.calc()
    #print(rom.calc())
    
if __name__ == "__main__":
    main()