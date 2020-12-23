'''
Author: your name
Date: 2020-10-10 21:09:41
LastEditTime: 2020-10-11 09:48:38
LastEditors: Please set LastEditors
Description: In User Settings Edit
FilePath: \图解算法 使用Python - 范例程序\范例程序\ch08\ch08_01.py
'''
class list_node:
    def __init__(self):
        self.val=0
        self.next=None

head=[list_node()]*14 #声明一个节点类型的链表数组
        
run=[0]*14
flag = True
flag2 = False

def dfs(current,flag,flag2): #深度优先函数
    run[current]=1
    if current == 3:
        flag2 = True
    if flag == True and flag2 == True:
        print('[%d] ' %current, end='')
    if current == 10:
        flag = False
    ptr=head[current].next
    while ptr!=None:
        if run[ptr.val]==0:        #如果顶点尚未遍历，
            dfs(ptr.val,flag,flag2)           #就进行dfs的递归调用
        ptr=ptr.next
        
#声明图的边线数组       
data=[[1,2],[2,1],[1,12],[12,1], 
      [2,3],[3,2],[3,12],[12,3],
      [3,4],[4,3], [4,5],[5,4],
      [5,6],[6,5], [6,7],[7,6],
      [7,8],[8,7], [8,9],[9,8],
      [8,13],[13,8],[9,10],[10,9],
      [9,13],[13,9],[10,11],[11,10],
      [11,12],[12,11],[12,13],[13,12]]

for i in range(1,14):  #共有13个顶点
    run[i]=0          #把所有顶点设置成尚未遍历过
    head[i]=list_node()
    head[i].val=i     #设置各个链表头的初值
    head[i].next=None
    ptr=head[i]        #设置指针指向链表头
    for j in range(32): #32条边线
        if data[j][0]==i: #如果起点和链表头相等，则把顶点加入链表
            newnode=list_node()
            newnode.val=data[j][1]
            newnode.next=None
            while True:
                ptr.next=newnode    #加入新节点
                ptr=ptr.next
                if ptr.next==None:
                    break
        

print('图的邻接表内容：')      #打印图的邻接表内容
for i in range(1,14):
    ptr=head[i]
    print('顶点 %d=> ' %i,end='')
    ptr =ptr.next
    while ptr!=None:
        print('[%d] ' %ptr.val,end='')
        ptr=ptr.next
    print()
print('深度优先遍历的顶点：')      #打印深度优先遍历的顶点
dfs(3,flag,flag2)
#print()