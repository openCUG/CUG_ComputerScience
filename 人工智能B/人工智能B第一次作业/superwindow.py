from MainWindow import Ui_MainWindow
from PyQt5.QtWidgets import *
from PyQt5.QtGui import *
from PyQt5.QtCore import *
from paint import PaintWidget   #含有画布
from dfsClass import *  #含有链表类
from bfsClass import *  #含有节点和图类

class MainWindow(QMainWindow, Ui_MainWindow):
    def __init__(self, parent=None):
        super(MainWindow, self).__init__(parent)
        self.setupUi(self)
        self.title = 'PyQt paint'
        self.width = 1090
        self.height = 680
        self.count = 0
        self.setWindowTitle(self.title)
        self.setGeometry(0, 0, self.width, self.height)
        #按键的槽函数
        self.dfsButton.clicked.connect(self.dfsDeal)
        #self.bfsButton.clicked.connect(self.test)
        self.bfsButton.clicked.connect(self.bfsDeal)
        self.clearButton.clicked.connect(self.clearChecked)
        #图的数据以及节点的标号
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
        # 为深度遍历进行准备工作
        self.dfsPlaceHolder()
        # 为广度遍历进行准备工作
        self.bfsPlaceholder()
        # 添加画布以及绘画事件
        self.m = PaintWidget(self)
        self.m.move(0, 0)
        self.m.resize(self.width, self.height)
        self.resize(1090, self.height + 100)
        self.show()

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
