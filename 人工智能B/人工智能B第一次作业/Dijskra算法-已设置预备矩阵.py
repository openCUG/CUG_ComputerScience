
import numpy as np

def Result(prev, t):
    if prev[t] != 0:
        Result(prev, prev[t])
        print('->{}'.format(prev[t] + 1), end="")

def Dijkstra(n, weights):
    # 创建一个flag数组，用于保存遍历情况
    flag = np.zeros(n, bool)
    # 创建一个dist数组，用于保存最短路径
    dist = np.array(weights[0])
    # 创建一个prev数组，用于保存对应的最短节点
    prev = np.zeros(n, int)
    # 将源节点放入集合S中
    flag[0] = True
    # Dijkstra算法中重点：
    # ~~错误思路：迭代(n+1)/2次，因为每次可以确定两个节点
    # 迭代次数为n-1次，因为如果确定某一节点，但其最小值不会影响其他节点，每次迭代只能确定一个节点；
    # 依次将节点放入集合S中（即已访问过的节点）；
    for i in range(n-1):
        # 找到当前dist中还未被遍历的节点中权值最小的节点；
        # 并将其放入集合S中；
        temp = float('inf')
        u = 0
        for j in range(n):
            if not flag[j] and dist[j] != 0 and dist[j] < temp:
                u = j
                temp = dist[j]
        flag[u] = True
        # 确定当前节点最短距离后，其他节点最短距离是否随之改变，若改变，即可确定其最短路径；
        for j in range(n):
            if not flag[j] and weights[u][j] != 0:
                if dist[u] + weights[u][j] < dist[j] or dist[j] == 0:
                    dist[j] = dist[u] + weights[u][j]
                    prev[j] = u
    # 输出结果
    for i in range(1, n):
        if i == 9:
            print('hello world')
        print('{}：1'.format(dist[i]), end="")
        # 递归函数，因为prev中是从后往前读取节点
        Result(prev, i)
        print("->{}".format(i + 1))


def main():
    n = 13
    weight = [[0,75,0,118,0,0,0,0,0,0,0,140,0],
              [0,0,71,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0,151,0],
              [0,0,0,0,111,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,70,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,75,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,120,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,138,0,0,0,146],
              [0,0,0,0,0,0,0,0,0,101,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,211,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,99,0,0],
              [0,0,0,0,0,0,0,0,97,0,0,80,0]]
    # for i in range(n):
    #     weight.append(list(map(int, input().rstrip().split())))
    weights = np.array(weight).reshape(n, n)
    Dijkstra(n, weights)


if __name__ == '__main__':
    main()

"""
0 75 0 118 0 0 0 0 0 0 0 140 0
0 0 71 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 151 0
0 0 0 0 111 0 0 0 0 0 0 0 0
0 0 0 0 0 70 0 0 0 0 0 0 0
0 0 0 0 0 0 75 0 0 0 0 0 0
0 0 0 0 0 0 0 120 0 0 0 0 0
0 0 0 0 0 0 0 0 138 0 0 0 146
0 0 0 0 0 0 0 0 0 101 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 211 0 0 0
0 0 0 0 0 0 0 0 0 0 99 0 0
0 0 0 0 0 0 0 0 97 0 0 80 0
"""