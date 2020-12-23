from numpy import*

def decA(A,D):
    A = array(A)#读入矩阵
    D = array(D)
    n=len(A)
    L=zeros((n,n))#创建同等大小的矩阵L U
    U=zeros((n,n))

    #分解部分
    U[0,:]=A[0,:]#直接赋予LU矩阵比较明显的元素，免去后边计算麻烦
    L[:,0]=A[:,0]/U[0,0]#L矩阵的第一列
    for i in range(n):
        L[i,i]=1#这里可以在前边创建矩阵时直接创建等大的单位阵
    for row in range(n-1):
        flag=1#标志位，强制后边L相关元素只计算一次
        for col in range(row,n-1):
            U[row+1,col+1]=A[row+1,col+1]-dot(L[row+1,:],U[:,col+1])#计算U矩阵非零元素
            if (row+2<n)&(flag==1):#计算L矩阵非零元素
                for k in range(1,row+2):
                    L[row+2,k]=(A[row+2,k]-dot(L[row+2,:],U[:,k]))/U[k,k]
            flag+=1#标志位自加，以免重复计算同一位置元素
    #print(L)#打印
    #print(U)

    #计算部分
    lArray=[]
    uArray=[]
    rArray=[]
    xArray=[0,0,0,0,0]
    yArray=[]

    #录入l
    lArray.append(0)#匹配后面的矩阵
    for i in range(0,4):
        lArray.append(L[i+1][i])
    #print(lArray)
    #录入u
    for i in range(0,5):
        uArray.append(U[i][i])
    #print(uArray)
    #录入l
    for i in range(0,4):
        rArray.append(U[i][i+1])
    #print(rArray)

    #追
    yArray.append(D[0])
    for i in range(1,5):
        yArray.append(D[i]-lArray[i]*yArray[i-1])
    #print(yArray)
    #赶
    index=yArray[4]/uArray[4]
    xArray[4]=index
    i=4
    while i>0:
        xArray[i-1]=(yArray[i-1]-rArray[i-1]*xArray[i])/uArray[i-1]
        i-=1
    print("最终答案可以得出：")
    for i in xArray:
        print('{:.5f}'.format(i))

def main():#测试函数
    B=[[4,-1,0,0,0,],
        [-1,4,-1,0,0],
        [0,-1,4,-1,0],
        [0,0,-1,4,-1],
        [0,0,0,-1,4]]
    D=[100,
       0,
       0,
       0,
       200]
    decA(B,D)

if __name__ == "__main__":
    main()