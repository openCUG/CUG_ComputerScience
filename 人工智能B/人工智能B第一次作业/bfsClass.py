class Node:
    def __init__(self,x):
        self.x=x        #顶点数据
        self.next=None  #指向下一个顶点的指针

class GraphLink:
    def __init__(self):
        self.first = None
        self.last = None

    def my_print(self):
        current = self.first
        while current != None:
            print('[%d]' % current.x, end='')
            current = current.next
        print()

    def insert(self, x):
        newNode = Node(x)
        if self.first == None:
            self.first = newNode
            self.last = newNode
        else:
            self.last.next = newNode
            self.last = newNode