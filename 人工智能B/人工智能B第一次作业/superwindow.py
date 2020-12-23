from MainWindow import Ui_MainWindow
from PyQt5.QtWidgets import *
from PyQt5.QtGui import *
from PyQt5.QtCore import *
from paint import PaintWidget   #含有画布
from dfsClass import *  #含有链表类
from bfsClass import *  #含有节点和图类
import numpy as np
import time as t

class MainWindow(QMainWindow, Ui_MainWindow):
    def __init__(self, parent=None):
        super(MainWindow, self).__init__(parent)
        self.setupUi(self)
        self.initialBox()
        #按键的槽函数
        self.signalAndConnection()
        #图的数据以及节点的标号
        self.readyPlaceHolder()
        # 为A星算法进行准备工作
        self.aStarPlaceHolder()
        # 为深度遍历进行准备工作
        self.dfsPlaceHolder()
        # 为广度遍历进行准备工作
        self.bfsPlaceholder()
        #为贪婪算法进行准备工作
        self.greedyPlaceHolder()
        # 添加画布以及绘画事件
        self.painterPlaceHolder()
        self.show()

    #槽函数放置于此
    def signalAndConnection(self):
        self.dfsButton.clicked.connect(self.dfsDeal)
        self.bfsButton.clicked.connect(self.bfsDeal)
        self.greedyButton.clicked.connect(self.greedyTest)
        self.clearButton.clicked.connect(self.clearChecked)
        self.aStarButton.clicked.connect(self.clickTest)

    #对话框的初始化规格
    def initialBox(self):
        self.title = 'PyQt paint'
        self.width = 1090
        self.height = 680
        self.count = 0
        self.setWindowTitle(self.title)
        self.setGeometry(0, 0, self.width, self.height)

    #设置节点标号与权重的对应字典，以及连接关系
    def readyPlaceHolder(self):
        self.dict = {1: self.oradea, 2: self.zerind, 3: self.arad,
                     4: self.timisoara, 5: self.lugoj, 6: self.mehadia,
                     7: self.dobreta, 8: self.craiova, 9: self.pitesti,
                     12: self.sibiu, 11: self.fagaras, 10: self.bucharest, 13: self.rimnicu}
        self.data = [[1, 2], [2, 1], [1, 12], [12, 1],
                     [2, 3], [3, 2], [3, 12], [12, 3],
                     [3, 4], [4, 3], [4, 5], [5, 4],
                     [5, 6], [6, 5], [6, 7], [7, 6],
                     [7, 8], [8, 7], [8, 9], [9, 8],
                     [8, 13], [13, 8], [9, 10], [10, 9],
                     [9, 13], [13, 9], [10, 11], [11, 10],
                     [11, 12], [12, 11], [12, 13], [13, 12]]

    #为画布做准备
    def painterPlaceHolder(self):
        self.m = PaintWidget(self)
        self.m.move(0, 0)
        self.m.resize(self.width, self.height)
        self.resize(1090, self.height + 100)

    #用于清除画面中的选中状态
    def clearChecked(self):
        for i in range(1,14):
            self.dict[i].setChecked(False)

    #以bfs开头的都是和广度优先相关的函数
    def bfsPlaceholder(self):
        self.MAXSIZE = 15  # 定义队列的最大容量
        self.front = -1  # 指向队列的前端
        self.rear = -1  # 指向队列的末尾
        self.run = [0] * 14  # 用来记录各顶点是否遍历过
        self.queue = [0] * self.MAXSIZE
        self.Head = [GraphLink] * 14
        self.flag3 = True

    # 队列数据的存入
    def enqueue(self,value):
        if self.rear >= self.MAXSIZE:
            return
        self.rear += 1
        self.queue[self.rear] = value

    # 队列数据的取出
    def dequeue(self):
        if self.front == self.rear:
            return -1
        self.front += 1
        return self.queue[self.front]

    # 广度优先查找法
    def bfs(self,current):
        self.enqueue(current)  # 将第一个顶点存入队列
        self.run[current] = 1  # 将遍历过的顶点设置为1
        self.dict[current].setChecked(True)
        print('[%d]' % current, end='')  # 打印出该遍历过的顶点
        while self.front != self.rear:  # 判断当前的队伍是否为空
            current = self.dequeue()  # 将顶点从队列中取出
            tempnode = self.Head[current].first  # 先记录当前顶点的位置
            while tempnode != None:
                if self.run[tempnode.x] == 0:
                    self.enqueue(tempnode.x)
                    self.run[tempnode.x] = 1  # 记录已遍历过
                    if self.flag3 == True:
                        print('[%d]' % tempnode.x, end='')
                        self.dict[tempnode.x].setChecked(True)
                    if tempnode.x == 10:
                        self.flag3 = False
                if self.flag3 == True:
                    tempnode = tempnode.next
                else:
                    break

    def bfsDeal(self):
        print('图的邻接表内容：')  # 打印图的邻接表内容
        for i in range(1, 14):  # 共有8个顶点
            self.run[i] = 0  # 把所有顶点设置成尚未遍历过
            self.Head[i] = GraphLink()
            for j in range(32):
                if self.data[j][0] == i:  # 如果起点和链表头相等，则把顶点加入链表
                    DataNum = self.data[j][1]
                    self.Head[i].insert(DataNum)
            self.Head[i].my_print()  # 打印图的邻接标内容

        print('广度优先遍历的顶点：')  # 打印广度优先遍历的顶点
        self.bfs(3)
        self.bfsPlaceholder()
        print()

    #以dfs开头的都是和深度优先相关的函数
    def dfsPlaceHolder(self):
        self.flag = True
        self.flag2 = False
        self.head = [list_node()] * 14  # 声明一个节点类型的链表数组
        self.run = [0] * 14

    def dfs(self,current,flag,flag2):
        self.run[current] = 1
        if current == 3:
            self.flag2 = True
        if self.flag == True and self.flag2 == True:
            print('[%d] ' % current, end='')
            self.dict[current].setChecked(True)
        if current == 10:
            self.flag = False
        ptr = self.head[current].next
        while ptr != None:
            if self.run[ptr.val] == 0:  # 如果顶点尚未遍历，
                self.dfs(ptr.val,self.flag,self.flag2)  # 就进行dfs的递归调用
            ptr = ptr.next

    def dfsDeal(self):
        for i in range(1, 14):  # 共有13个顶点
            self.run[i] = 0  # 把所有顶点设置成尚未遍历过
            self.head[i] = list_node()
            self.head[i].val = i  # 设置各个链表头的初值
            self.head[i].next = None
            ptr = self.head[i]  # 设置指针指向链表头
            for j in range(32):  # 32条边线
                if self.data[j][0] == i:  # 如果起点和链表头相等，则把顶点加入链表
                    newnode = list_node()
                    newnode.val = self.data[j][1]
                    newnode.next = None
                    while True:
                        ptr.next = newnode  # 加入新节点
                        ptr = ptr.next
                        if ptr.next == None:
                            break

        print('深度优先遍历的顶点：')  # 打印深度优先遍历的顶点
        self.dfs(1,self.flag,self.flag2)
        self.dfsPlaceHolder()   #用于恢复初始状态，使程序可以重复运行

    #以greedy开头的都是和贪婪算法相关的函数
    def greedyPlaceHolder(self):
        self.n = 13
        self.weight = [[0, 75, 0, 118, 0, 0, 0, 0, 0, 0, 0, 140, 0],
                       [0, 0, 71, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 151, 0],
                       [0, 0, 0, 0, 111, 0, 0, 0, 0, 0, 0, 0, 0],
                       [0, 0, 0, 0, 0, 70, 0, 0, 0, 0, 0, 0, 0],
                       [0, 0, 0, 0, 0, 0, 75, 0, 0, 0, 0, 0, 0],
                       [0, 0, 0, 0, 0, 0, 0, 120, 0, 0, 0, 0, 0],
                       [0, 0, 0, 0, 0, 0, 0, 0, 138, 0, 0, 0, 146],
                       [0, 0, 0, 0, 0, 0, 0, 0, 0, 101, 0, 0, 0],
                       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                       [0, 0, 0, 0, 0, 0, 0, 0, 0, 211, 0, 0, 0],
                       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99, 0, 0],
                       [0, 0, 0, 0, 0, 0, 0, 0, 97, 0, 0, 80, 0]]

    def Result(self,prev, t):
        if prev[t] != 0:
            self.Result(prev, prev[t])
            print('->{}'.format(prev[t] + 1), end="")
            self.dict[prev[t] + 1].setChecked(True)

    def Dijkstra(self, n, weights):
        # 创建一个flag数组，用于保存遍历情况
        flag4 = np.zeros(n, bool)
        # 创建一个dist数组，用于保存最短路径
        dist = np.array(weights[0])
        # 创建一个prev数组，用于保存对应的最短节点
        prev = np.zeros(n, int)
        # 将源节点放入集合S中
        flag4[0] = True
        # Dijkstra算法中重点：
        # ~~错误思路：迭代(n+1)/2次，因为每次可以确定两个节点
        # 迭代次数为n-1次，因为如果确定某一节点，但其最小值不会影响其他节点，每次迭代只能确定一个节点；
        # 依次将节点放入集合S中（即已访问过的节点）；
        for i in range(n - 1):
            # 找到当前dist中还未被遍历的节点中权值最小的节点；
            # 并将其放入集合S中；
            temp = float('inf')
            u = 0
            for j in range(n):
                if not flag4[j] and dist[j] != 0 and dist[j] < temp:
                    u = j
                    temp = dist[j]
            flag4[u] = True
            # 确定当前节点最短距离后，其他节点最短距离是否随之改变，若改变，即可确定其最短路径；
            for j in range(n):
                if not flag4[j] and weights[u][j] != 0:
                    if dist[u] + weights[u][j] < dist[j] or dist[j] == 0:
                        dist[j] = dist[u] + weights[u][j]
                        prev[j] = u
        # 输出结果
        i = 9
        print('{}：3'.format(dist[i]), end="")
        self.dict[3].setChecked(True)
        # 递归函数，因为prev中是从后往前读取节点
        self.Result(prev, i)
        print("->{}".format(i + 1))
        self.dict[10].setChecked(True)

    def greedyTest(self):
        weights = np.array(self.weight).reshape(self.n, self.n)
        self.Dijkstra(self.n, weights)
        self.greedyPlaceHolder()

    #以aStar开头的都是和A*算法相关的函数
    def aStarPlaceHolder(self):
        self.path = []
        self.pathTest = []
        self.pathWeight = []
        self.straightDis = [366,0,160,242,161,176,77,151,226,244,241,234,380,100,193,253,329,80,199,374]
        self.placeName = ['A','B','C','D','E','F','G','H','I','L','M','N','O','P','R','S','T','U','V','Z']
        self.placeNum = [3,10,8,7,99,11,99,99,99,5,6,99,1,9,13,12,4,99,99,2]
        self.disDict = dict(zip(self.placeName,self.straightDis))
        self.numNameDict = dict(zip(self.placeName,self.placeNum))
        self.weightForAStar = [[1, 2, 71], [2, 1, 71], [1, 12, 151], [12, 1, 151],
                               [2, 3, 75], [3, 2, 75], [3, 12, 140], [12, 3, 140],
                               [3, 4, 118], [4, 3, 118], [4, 5, 111], [5, 4, 115],
                               [5, 6, 70], [6, 5, 70], [6, 7, 75], [7, 6, 75],
                               [7, 8, 120], [8, 7, 120], [8, 9, 138], [9, 8, 138],
                               [8, 13, 146], [13, 8, 146], [9, 10, 101], [10, 9, 101],
                               [9, 13, 97], [13, 9, 97], [10, 11, 211], [11, 10, 211],
                               [11, 12, 99], [12, 11, 99], [12, 13, 80], [13, 12, 80]]

    def get_key(self, dict, value):
        return [k for k, v in dict.items() if v == value][0]

    def aStar(self, nodeNow, path, pathTest, pathWeight):
        while nodeNow != 10:
            print(nodeNow)
            for i in self.weightForAStar:
                if i[0] == nodeNow:
                    self.pathTest.append(i[1])
                    self.pathWeight.append(i[2] + self.disDict[self.get_key(self.numNameDict, i[1])])
                    # print(self.pathTest)
                    # print(self.pathWeight)
                    index = self.pathWeight.index(min(self.pathWeight))
            self.path.append(self.pathTest[index])
            self.pathTest = []
            self.pathWeight = []
            self.dict[nodeNow].setChecked(True)
            nodeNow = self.numNameDict[self.get_key(self.numNameDict, self.path[len(self.path) - 1])]
        self.dict[10].setChecked(True)
        self.aStarPlaceHolder()

    def clickTest(self):
        nodeNow = 3
        self.path.append(3)
        self.aStar(nodeNow, self.path, self.pathTest, self.pathWeight)
        print(self.path)