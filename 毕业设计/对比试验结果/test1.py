import pandas as pd     #引入pandas包
import numpy as np
import matplotlib.pyplot as plt
pd.set_option('display.max_rows', None)

txt1 = '0.2.txt'
txt2 = '0.4.txt'
txt3 = '0.6.txt'
txt4 = '0.8.txt'
txt5 = '1.0.txt'
# txt1 = 'C0.2.txt'
# txt2 = 'C0.4.txt'
# txt3 = 'C0.6.txt'
# txt4 = 'C0.8.txt'
# txt5 = 'C1.0.txt'

table1 = pd.read_table(txt1,sep='\t',header=None)
table2 = pd.read_table(txt2,sep='\t',header=None)     #读入txt文件，分隔符为\t
table3 = pd.read_table(txt3,sep='\t',header=None)
table4 = pd.read_table(txt4,sep='\t',header=None)
table5 = pd.read_table(txt5,sep='\t',header=None)

print(table1)
table5[1][12] = 11.003674
table5[2][12] = 1200
table5[4][12] = 0.27

fig, ax = plt.subplots() # 创建图实例

ax.plot(table1[2], table1[1], label='0.2 Grt') 
ax.plot(table2[2], table2[1], label='0.4 Grt')
ax.plot(table3[2], table3[1], label='0.6 Grt')
ax.plot(table4[2], table4[1], label='0.8 Grt')
ax.plot(table5[2], table5[1], label='Attack')
ax.set_xlabel('round') #设置x轴名称 x label
ax.set_ylabel('PSNR') #设置y轴名称 y label
ax.set_title('PSNR before and after defense') 
ax.legend() 

# plt.savefig("Cifar_PSNR.png")
plt.savefig("MNIST_PSNR.png")
plt.show() #图形可视化