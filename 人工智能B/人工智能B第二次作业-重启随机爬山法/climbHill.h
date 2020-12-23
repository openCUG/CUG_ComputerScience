//
// Created by christan on 2020/11/5.
//

#ifndef CLIMBHILL_CLIMBHILL_H
#define CLIMBHILL_CLIMBHILL_H

#include <vector>
#include <iostream>
#include <stdlib.h>
#include <time.h>
#include <algorithm>
#define random(x) (rand()%x)  // 定义产生随机数的函数

using namespace std;
class climbHill {
private:
    int N;                // 棋盘大小
    int step;			  // 记录运行的步数
    int maxSteps;         // 达到最大扫描次数后，仍未解决则重启
    int rowPosition;      // 在该行位置检测最优位置
public:
    climbHill(int N) {
        step = 0;
        maxSteps = 10000;
        this->N = N;
        rowPosition = 0;
    }

    int rand_X(int x)
    {
        return rand()%x;
    }

    //随机重启，达到一步的步数后，仍未求解那么就重新打乱棋盘
    //先生成对角线的皇后棋子，然后随机交换两行，
    void reset(vector<int>& chessboard) {
        chessboard.clear();
        for (int i = 0; i < N; i++) {
            chessboard.push_back(i);    //生成对角线棋子
        }
        for (int row1 = 0; row1 < N; row1++) {
            int row2 = rand_X(N-1);
            // 随机交换行，打散棋盘，但保证皇后都在不同列
            swap(chessboard[row1], chessboard[row2]);
        }
    }

    // 计算当前棋盘存在的相互攻击的皇后对数
    int getNumofConflicts(vector<int> *chessboard) {
        int numOfConflicts = 0;
        int width = this->N;
        for (int i = 0; i < width; i++) {
            for (int j = i + 1; j < width; j++) {
                // 当存在皇后位于对角线的时候 冲突数+1
                if (abs(j - i) == abs((*chessboard)[i] - (*chessboard)[j])) {
                    numOfConflicts++;
                }
                // 当存在皇后位于同一列的时候，冲突数+1
                if ((*chessboard)[i] == (*chessboard)[j]) {
                    numOfConflicts++;
                }
            }
        }
        return numOfConflicts;
    }

    // 计算某一行的最优位置
    int chooseTheBestPosition(vector<int>* chessboard, int row) {
        // 记录为移动之前的位置
        int originPosition = (*chessboard)[row];
        //cout<<originPosition<<endl;
        // 记录每一个位置对应的棋盘状态所对应的冲突数
        vector<int> conflictData;
        for (int i = 0; i < N; i++) {
            (*chessboard)[row] = i; //行不变，把这一行的棋子从0推动到N，分别获取每种情况下的冲突数。
            conflictData.push_back(getNumofConflicts(chessboard));
        }

        //记录冲突数最小的几个位置，然后随机然后一个位置
        int less = 0;
        vector<int> bestPosition;
        for (int i = 0; i < N; i++) {
            if (i == 0) {
                bestPosition.push_back(0);
                less = conflictData[0];
                continue;
            }
            // 判断i位置冲突数小于最优位置,清空向量，存储更小冲突的位置
            if (conflictData[i] < less) {
                bestPosition.clear();
                bestPosition.push_back(i);
                less = conflictData[i];
            }
                // 将同样最小的冲突位置也添加到向量中
                // 这种情况是当前发现的最小冲突位置和已经发现的最小冲突位置冲突数相同。
            else if(conflictData[i] == less) {
                bestPosition.push_back(i);
            }
        }
        //如果只有一个最佳位置，那就用这个最佳位置
        if (bestPosition.size() == 1)
            return bestPosition[0];

        // 最佳位置有多个，则随机筛选
        srand((unsigned)time(0));
        return bestPosition[rand() % bestPosition.size()];
    }


    int moveToTheBestPlace(vector<int>* chessboard, int row)
    {
        // 记录为移动之前的位置
        int originPosition = (*chessboard)[row];
        int newPosition;
        int originConflicts = getNumofConflicts(chessboard);;
        int numOfConflicts,index;

        if((*chessboard)[row]<N-1){
            //cout<<"first"<<(*chessboard)[row]<<endl;
            (*chessboard)[row]++;
            //cout<<"down"<<(*chessboard)[row]<<endl;
            index = (*chessboard)[row];
            numOfConflicts = getNumofConflicts(chessboard);

            (*chessboard)[row]--;
            //cout<<"back"<<(*chessboard)[row]<<endl;
        }
        else if((*chessboard)[row]==N-1){
            //cout<<"first"<<(*chessboard)[row]<<endl;
            (*chessboard)[row]--;
            //cout<<"up"<<(*chessboard)[row]<<endl;
            index = (*chessboard)[row];
            numOfConflicts = getNumofConflicts(chessboard);

            (*chessboard)[row]++;
            //cout<<"back"<<(*chessboard)[row]<<endl;
        }

        if(originConflicts <= numOfConflicts){
            newPosition = originPosition;
            //cout<<"return "<<newPosition<<endl;
        }
        else if(originConflicts > numOfConflicts){
            newPosition = index;
            //cout<<"return "<<newPosition<<endl;
        }
        return newPosition;

    }

    void printboard(vector<int>& chessboard) {
        for (int i = 0; i < N; i++) {
            int num = chessboard[i];
            for (int j = 0; j < num; j++) {
                cout << " = ";
            }
            cout << " Q ";
            for (int k = num + 1; k < N; k++) {
                cout << " = ";
            }
            cout << endl;
        }
    }



    // 每行选择最优位置
    vector<int>* scanChessboard(vector<int>* chessboard, int row){
        (*chessboard)[row] = moveToTheBestPlace(chessboard,row);
        return chessboard;
    }

    // 求解，不断搜寻状态更好的情况，直到冲突数为0
    vector<int>* solve(vector<int> *chessboard) {
        // 随机播种
        srand(time(NULL));
        int resetTime = 0;  // 重启步数
        step = 0;   // 统计运行步数
        // 当冲突数为0时终止爬山
        cout<<"计算中"<<endl;
        while (getNumofConflicts(chessboard) > 0) {
            if (step >= maxSteps) {
                cout<<step<<endl;
                reset(*chessboard);
                resetTime++;
                step = 0;
                printboard(*chessboard);
                //cout << "随机重启" << endl;
            }
            // 将rowPostion行的皇后移到同一行的最优位置
            chessboard = scanChessboard(chessboard,rowPosition++);
            // 判断rowPosition是否归零，防止越界
            rowPosition = rowPosition >= N ? rowPosition % N : rowPosition;
            step++;
        }
        cout << "Solved the problem, totally " << step << " steps. Including "<< resetTime<< " reset times."  << endl;
        return chessboard;
    }

};

#endif //CLIMBHILL_CLIMBHILL_H
