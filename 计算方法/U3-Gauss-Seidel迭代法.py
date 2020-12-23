import numpy as np

A = np.array([[4, 1, -1, 0],
              [1, -5, -1, -3],
              [2, -1, -6, 1],
              [5, 4, 4, 30]])
B = np.array([8, 1, -1, 16])
x0 = np.array([1, 1, 1, 1])
x = np.array([0, 0.0, 0.0, 0.0])
count=0

def Gauss_Seidel():
    count = 0
    x0 = np.array([1, 1, 1, 1])
    while True:
        for i in range(4):
            temp=0
            tempx=x0.copy()
            for j in range(4):
                if i!=j:
                    temp+=x0[j]*A[i][j]
            x[i]=(B[i]-temp)/A[i][i]
            x0[i]=x[i].copy()
        calTemp=max(abs(x-tempx))
        count+=1
        if calTemp <0.0001:
            break
        else:
            x0=x.copy()
        print("第{}次迭代".format(count))
        print(x)
    print("--------------------------")
    print("得出")
    for i in x:
        print(round(i,4))

def main():
    Gauss_Seidel()

if __name__ == "__main__":
    main()