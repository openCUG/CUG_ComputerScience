straightDis = [366,0,160,242,161,176,77,151,226,244,241,234,380,100,193,253,329,80,199,374]
placeName = ['A','B','C','D','E','F','G','H','I','L','M','N','O','P','R','S','T','U','V','Z']
placeNum = [3,10,8,7,99,11,99,99,99,5,6,99,1,9,13,12,4,99,99,2]
disDict = dict(zip(placeName,straightDis))
numNameDict = dict(zip(placeName,placeNum))

data = [[1, 2], [2, 1], [1, 12], [12, 1],
        [2, 3], [3, 2], [3, 12], [12, 3],
        [3, 4], [4, 3], [4, 5], [5, 4],
        [5, 6], [6, 5], [6, 7], [7, 6],
        [7, 8], [8, 7], [8, 9], [9, 8],
        [8, 13], [13, 8], [9, 10], [10, 9],
        [9, 13], [13, 9], [10, 11], [11, 10],
        [11, 12], [12, 11], [12, 13], [13, 12]]

weight = [[1, 2,71], [2, 1,71], [1, 12,151], [12, 1,151],
        [2, 3,75], [3, 2,75], [3, 12,140], [12, 3,140],
        [3, 4,118], [4, 3,118], [4, 5,111], [5, 4,115],
        [5, 6,70], [6, 5,70], [6, 7,75], [7, 6,75],
        [7, 8,120], [8, 7,120], [8, 9,138], [9, 8,138],
        [8, 13,146], [13, 8,146], [9, 10,101], [10, 9,101],
        [9, 13,97], [13, 9,97], [10, 11,211], [11, 10,211],
        [11, 12,99], [12, 11,99], [12, 13,80], [13, 12,80]]

def get_key (dict, value):
    return [k for k, v in dict.items() if v == value][0]


path = []
pathTest = []
pathWeight = []

def test(nodeNow,path,pathTest,pathWeight):
    while nodeNow != 10:
        for i in weight:
            if i[0] == nodeNow:
                pathTest.append(i[1])
                pathWeight.append(i[2]+disDict[get_key(numNameDict,i[1])])
                index = pathWeight.index(min(pathWeight))
        path.append(pathTest[index])
        pathTest=[]
        pathWeight=[]
        nodeNow = numNameDict[get_key(numNameDict,path[len(path)-1])]
        print(path)
        print(nodeNow)

nodeNow = 3
path.append(3)
test(nodeNow,path,pathTest,pathWeight)
print(path)
# print(pathTest)
# print(pathWeight)

