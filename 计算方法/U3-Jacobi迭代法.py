import numpy as np

def Jacob(a,b):
    x1 = x2 = x3 = x4=1 #设置(1,1,1)为初始点
    count = 0
    X = [[x1],[x2],[x3],[x4]]
    Xarray = np.array(X)   #转为矩阵
    barray = np.array(b)
    
    array = np.array(a) #读入矩阵
    L = U = H = [[0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0]]#创建同等大小的矩阵L U
    D = [[4,0,0,0],
         [0,-5,0,0],
         [0,0,-6,0],
         [0,0,0,30]]
    Darray = np.array(D)
    Darray_N = np.linalg.inv(Darray)  #取逆矩阵

    for i in range(len(a)):
        for j in range(len(a[0])):
            #为L添加内容
            if i>j:
                L[i][j] = a[i][j]
            #为U添加内容
            elif j>i:
                U[i][j] = a[i][j]
            #相加生成H阵
    for i in range(len(a)):
        for j in range(len(a[0])):
            H[i][j] = (L[i][j] + H[i][j])/2
    Harray = np.array(H)
    #开始迭代
    while count<20:
        a_1 = np.dot(Darray_N,Harray)
        a_2 = np.dot(a_1,Xarray)
        a_3 = -1*a_2
        a_4 = np.dot(Darray_N,barray)
        Xarray = a_3 + a_4

        count += 1
        
        print('第{}次'.format(count))
        print(Xarray)
    print("方程解为：")
    print(Xarray)
def main():
    A=[[4,1,-1,0],
        [1,-5,-1,-3],
        [2,-1,-6,1],
        [5,4,4,30]]
    B=[[8],[1],[-1],[16]]
    Jacob(A,B)

if __name__ == "__main__":
    main()