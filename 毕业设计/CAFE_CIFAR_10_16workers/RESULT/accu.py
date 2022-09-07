import pandas as pd     #引入pandas包
import numpy as np
import matplotlib.pyplot as plt
pd.set_option('display.max_rows', None)

txt1 = 'VFL_cafe_cifar10_16_0.01.txt'
txt2 = 'VFL_cafe_cifar10_16_0.01_defense.txt'

table1 = pd.read_table(txt1,sep='\t',header=None)
table2 = pd.read_table(txt2,sep='\t',header=None)     #读入txt文件，分隔符为\t

print(table2)
# table1[1][12] = 11.003674
# table1[2][12] = 1200
# table1[4][12] = 0.27

fig, ax = plt.subplots() # 创建图实例

ax.plot(table1[2], table1[4], label='Attack') # 作y1 = x 图，并标记此线名为linear
ax.plot(table2[2], table2[4], label='Defense') #作y2 = x^2 图，并标记此线名为quadratic
ax.set_xlabel('round') #设置x轴名称 x label
ax.set_ylabel('Accuracy') #设置y轴名称 y label
ax.set_title('Accuracy on test set') #设置图名为Simple Plot
ax.legend() #自动检测要在图例中显示的元素，并且显示

plt.savefig("Accuracy.png")
plt.show() #图形可视化