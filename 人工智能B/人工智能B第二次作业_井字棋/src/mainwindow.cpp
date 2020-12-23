#pragma execution_character_set("utf-8")

#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <iostream>
#include<time.h>
#include <QtWidgets>
#include <QDebug>

using namespace std;

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow),
    isCircle(true),     // 圈优先
    currentDepth(9),    // 当前深度为9
    player(MAN),        // 下子方为人类
    levelType(AIZZ)     // 难度等级为人工智障
{
    ui->setupUi(this);

    this->setWindowTitle(tr("井字棋"));
    this->setFixedSize(420,300);

    //棋盘
    int btnX = 0, btnY = 0, btnW = 100, btnH = 100;
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            QPushButton *btn = new QPushButton(this);
            btnList.push_back(btn);
            btnX = j * 100;
            btnY = i * 100;
            btn->setGeometry(btnX, btnY, btnW, btnH);
            //btn->setStyleSheet("border-image: url(:/grid.png);");
            connect(btn, SIGNAL(clicked(bool)), this, SLOT(btnClick()));
        }
    }

    QButtonGroup * groupone = new QButtonGroup(this);
    groupone->addButton(ui->manFirst);
    groupone->addButton(ui->comFirst);
    QButtonGroup * grouptwo = new QButtonGroup(this);
    grouptwo->addButton(ui->comVSman);
    grouptwo->addButton(ui->manVSman);
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::setLevelType()
{
    if (ui->comboBox->currentIndex()==0){
        // 减少查找步骤3步
        qDebug()<<ui->comboBox->currentIndex()<<endl;
        levelType = AIZZ;
    }
    else if (ui->comboBox->currentIndex()==1){
        // 减少查找步骤1步
        qDebug()<<ui->comboBox->currentIndex()<<endl;
        levelType = AIZN;
    }
    else if (ui->comboBox->currentIndex()==2){
        // 不减少查找步骤
        qDebug()<<ui->comboBox->currentIndex()<<endl;
        levelType = AIZS;
    }
}

// 点击棋盘事件
void MainWindow::btnClick() {
    QPushButton *btn = qobject_cast<QPushButton*>(sender());
    if (gameType) {
        // 人人对战
        ManVSMan(btn);
    }
    else {
        // 人机对战
        setLevelType();
        ManVSCom(btn);
    }
}

// 人人对战
void MainWindow::ManVSMan(QPushButton *btn)
{
    isCircle = !isCircle;
    if (isCircle) {
        btn->setStyleSheet("border-image: url(:/ring.png);");
        btn->setEnabled(false);
        int btnX = btn->pos().x() / 100;
        int btnY = btn->pos().y() / 100;
        _cirCleMapNum[btnX][btnY] = 1;
        isWin();
    } else {
        btn->setStyleSheet("border-image: url(:/fork.png);");
        btn->setEnabled(false);
        int btnX = btn->pos().x() / 100;
        int btnY = btn->pos().y() / 100;
        _crossMapNum[btnX][btnY] = 1;
        isWin();
    }
}

// 人机对战
void MainWindow::ManVSCom(QPushButton *btn)
{
    // 人类走棋
    int flag = a_man_play(btn);
    if(flag == 1)
        currentDepth--;

    // 判断胜负
    if (player == a_isWin()) {
       QMessageBox::information(this, tr("井字棋"), tr("你赢了！"), QMessageBox::Ok);
       ending();
       return;
    }
    else if(a_isDraw())
        return;
    else
        player = (player == COM) ? MAN : COM;

    // 电脑走棋
    flag = a_com_play();
    if(flag == 1)
        currentDepth--;

    // 判断胜负
    if (player == a_isWin()) {
       QMessageBox::information(this, tr("井字棋"), tr("电脑赢了！"), QMessageBox::Ok);
       ending();
       return;
    }
    else if(a_isDraw())
        return;
    else
        player = (player == COM) ? MAN : COM;
}

// 检查电脑优先
void MainWindow::checkComFirst()
{
    if(ui->comVSman->isChecked())
    {
        if(ui->comFirst->isChecked())
        {
            // 若是电脑优先，则电脑先走棋
            a_com_play();
            // 深度减一
            currentDepth--;
            // 人类走棋
            player = MAN;
        }
        else
        {
            player = MAN;
        }
    }
}

// 判断是输赢或者平局
void MainWindow::isWin() {
    if ((_cirCleMapNum[0][0] && _cirCleMapNum[0][1] && _cirCleMapNum[0][2]) ||
        (_cirCleMapNum[1][0] && _cirCleMapNum[1][1] && _cirCleMapNum[1][2]) ||
        (_cirCleMapNum[2][0] && _cirCleMapNum[2][1] && _cirCleMapNum[2][2])) {
        QMessageBox::information(this, tr("井字棋"), tr("圈赢了！"), QMessageBox::Ok);
        ending();
    } else if ((_cirCleMapNum[0][0] && _cirCleMapNum[1][0] && _cirCleMapNum[2][0]) ||
               (_cirCleMapNum[0][1] && _cirCleMapNum[1][1] && _cirCleMapNum[2][1]) ||
               (_cirCleMapNum[0][2] && _cirCleMapNum[1][2] && _cirCleMapNum[2][2])) {
        QMessageBox::information(this, tr("井字棋"), tr("圈赢了！"), QMessageBox::Ok);
        ending();
    } else if ((_cirCleMapNum[0][0] && _cirCleMapNum[1][1] && _cirCleMapNum[2][2]) ||
               (_cirCleMapNum[0][2] && _cirCleMapNum[1][1] && _cirCleMapNum[2][0])) {
        QMessageBox::information(this, tr("井字棋"), tr("圈赢了！"), QMessageBox::Ok);
        ending();
    } else if ((_crossMapNum[0][0] && _crossMapNum[0][1] && _crossMapNum[0][2]) ||
               (_crossMapNum[1][0] && _crossMapNum[1][1] && _crossMapNum[1][2]) ||
               (_crossMapNum[2][0] && _crossMapNum[2][1] && _crossMapNum[2][2])) {
        QMessageBox::information(this, tr("井字棋"), tr("叉赢了！"), QMessageBox::Ok);
        ending();
    } else if ((_crossMapNum[0][0] && _crossMapNum[1][0] && _crossMapNum[2][0]) ||
               (_crossMapNum[0][1] && _crossMapNum[1][1] && _crossMapNum[2][1]) ||
               (_crossMapNum[0][2] && _crossMapNum[1][2] && _crossMapNum[2][2])) {
        QMessageBox::information(this, tr("井字棋"), tr("叉赢了！"), QMessageBox::Ok);
        ending();
    } else if ((_crossMapNum[0][0] && _crossMapNum[1][1] && _crossMapNum[2][2]) ||
               (_crossMapNum[0][2] && _crossMapNum[1][1] && _crossMapNum[2][0])) {
        QMessageBox::information(this, tr("井字棋"), tr("叉赢了！"), QMessageBox::Ok);
        ending();
    } else if(isDraw()) {
        QMessageBox::information(this, tr("井字棋"), tr("平局！"), QMessageBox::Ok);
        ending();
    }
}

// 人人对战的平局
bool MainWindow::isDraw(){
    int times = 0;
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (_cirCleMapNum[i][j] != 0)
                times ++;
            if(_crossMapNum[i][j] != 0)
                times ++;
        }
    }
    // 平局
    if (times == 9)
        return true;
    // 非平局
    else
        return false;
}

// 棋局结束
void MainWindow::ending() {
    QList<QPushButton *> ::iterator it;
    isCircle = true;
    for(it=btnList.begin();it!=btnList.end();it++)
    {
        // 需要把迭代器转成QPushButton
        QPushButton *btn = *it;
        btn->setStyleSheet("border-image: url(:/grid.png);");
        btn->setEnabled(true);
    }
    clearMapNum();

    // 检查电脑优先
    checkComFirst();

}

// 清空重置
void MainWindow::clearMapNum()
{
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            _cirCleMapNum[i][j] = 0;
            _crossMapNum[i][j] = 0;
            board[i][j] = 0;
            tempBoard[i][j] = 0;
        }
    }
    currentDepth = 9;
}

void MainWindow::on_manVSman_clicked()
{
    gameType = 1;
    // 难度优先顺序不可见
    ending();
}

void MainWindow::on_comVSman_clicked()
{
    gameType = 0;
    // 难度优先顺序可见
    ending();
}

void MainWindow::on_manFirst_clicked()
{
    gameType = 0;
    ending();
}

void MainWindow::on_comFirst_clicked()
{
    gameType = 0;
    ending();
}

// ------------AI逻辑部分-------------------------------------------

// 人机对战判断输赢
int MainWindow::a_isWin() {
    // 判断横向输赢
    for (int i = 0; i < 3; i++)
        {
            if (board[i][0] + board[i][1] + board[i][2] == 3)
                return 1;
            else if (board[i][0] + board[i][1] + board[i][2] == -3)
                return -1;
        }
        // 判断竖向输赢
        for (int j = 0; j < 3; j++)
        {
            if (board[0][j] + board[1][j] + board[2][j] == 3)
                return 1;
            else if (board[0][j] + board[1][j] + board[2][j] == -3)
                return -1;
        }
        // 判断斜向输赢
        if (board[0][0] + board[1][1] + board[2][2] == 3 || board[0][2] + board[1][1] + board[2][0] == 3)
            return 1;
        else if (board[0][0] + board[1][1] + board[2][2] == -3 || board[0][2] + board[1][1] + board[2][0] == -3)
            return -1;
        else  return 0;

}

// 人机对战的平局
bool MainWindow::a_isDraw()
{
    int times = 0;
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (board[i][j] != 0) {
                times ++;
            }
        }
    }
    // 平局
    if (times == 9) {
        QMessageBox::information(this, tr("井字棋"), tr("平局！"), QMessageBox::Ok);
        ending();
        return true;
    }
    else
    {
        return false;
    }
}

// 评估函数
int MainWindow::a_evaluteMap() {
    int i, j;

    //如果计算机赢了，返回最大值
    if (a_isWin() == COM)
        return MAX_NUM;

    //如果计算机输了，返回最小值
    if (a_isWin() == MAN)
        return -MAX_NUM;

    //该变量用来表示评估函数的值
    int count = 0;

    //将棋盘中的空格填满自己的棋子，既将棋盘数组中的0变为1
    for (i = 0; i < 3; i++)
        for (j = 0; j < 3; j++)
        {
            if (board[i][j] == 0)
                tempBoard[i][j] = COM;
            else
                tempBoard[i][j] = board[i][j];
        }
    //电脑一方
    //计算每一行中有多少行的棋子连成3个的
    for (i = 0; i < 3; i++)
        count += (tempBoard[i][0] + tempBoard[i][1] + tempBoard[i][2]) / 3;
    for (i = 0; i < 3; i++)
        count += (tempBoard[0][i] + tempBoard[1][i] + tempBoard[2][i]) / 3;
    count += (tempBoard[0][0] + tempBoard[1][1] + tempBoard[2][2]) / 3;
    count += (tempBoard[2][0] + tempBoard[1][1] + tempBoard[0][2]) / 3;

    //将棋盘中的空格填满对方的棋子，既将棋盘数组中的0变为-1
    for (i = 0; i < 3; i++)
        for (j = 0; j < 3; j++)
        {
            if (board[i][j] == 0)
                tempBoard[i][j] = MAN;
            else tempBoard[i][j] = board[i][j];
        }
    //对方
    //计算每一行中有多少行的棋子连成3个的
    for (i = 0; i < 3; i++)
        count += (tempBoard[i][0] + tempBoard[i][1] + tempBoard[i][2]) / 3;
    for (i = 0; i < 3; i++)
        count += (tempBoard[0][i] + tempBoard[1][i] + tempBoard[2][i]) / 3;
    count += (tempBoard[0][0] + tempBoard[1][1] + tempBoard[2][2]) / 3;
    count += (tempBoard[2][0] + tempBoard[1][1] + tempBoard[0][2]) / 3;

    // 返回的数因为包括了负数和整数，所以不会太大
    return count;
}

void MainWindow::a_makeMove(Move curMove) {
    board[curMove.x][curMove.y] = player;
    player = (player == COM) ? MAN : COM;
}

void MainWindow::a_unMakeMove(Move curMove) {
    board[curMove.x][curMove.y] = 0;
    player = (player == COM) ? MAN : COM;
}

// 获取棋盘上一共还剩多少步
int MainWindow::a_getMoveList(Move moveList[]) {
    int moveCount = 0;
    int i, j;
    for (i = 0; i < COL; i++)
    {
        for (j = 0; j < ROW; j++)
        {
            if (board[i][j] == 0)
            {
                moveList[moveCount].x = i;
                moveList[moveCount].y = j;
                moveCount++;
            }
        }
    }
    //返回一共多少个空的位置
    return moveCount;
}

// 极小极大过程
int MainWindow::a_miniMaxsearch(int depth) {
    //估值
    int value;
    //最好的估值
    int bestValue = 0;
    int moveCount = 0;
    int i;
    //保存可以下子的位置
    Move moveList[9];
    // 如果在深度未耗尽之前赢了
    if (a_isWin() == COM || a_isWin() == MAN)
    {
        // 这里返回的评估函数值是给递归用的
        return a_evaluteMap();
    }
    //如果搜索深度耗尽
    if (depth == 0)
    {
        // 这里返回的评估函数值是给递归用的
        return a_evaluteMap();
    }

    // 如果在深度未耗尽并且都没赢。
    // 先给一个初始值
    if (COM == player) {
        bestValue = -MAX_NUM;
    }
    else if (MAN == player)
    {
        bestValue = MAX_NUM;
    }

    //深度未耗尽并且都没赢的情况下，电脑需要获取到棋盘中剩余的位置，并且找到某一个位置下子
    // 获取棋盘上一共还剩多少步
    moveCount = a_getMoveList(moveList);

    // 根据难度等级降低查找的步数
    moveCount -= levelType;
    if(moveCount < 1)
    {
        bestMove = moveList[0];
        return bestValue;
    }

    // 遍历棋盘上剩余的每一步，找到最优点
    for (i = 0; i < moveCount; i++)
    {
        // 拿到棋盘剩余棋格中的一个棋格
        Move curMove = moveList[i];

        // 假装下个子
        a_makeMove(curMove);
        // 假装下子完成后，调用miniMax。
        // 调用完成后，获取返回值2
        value = a_miniMaxsearch(depth - 1);
        // 把假装下子的棋格清空
        a_unMakeMove(curMove);

        if (player == COM)
        {
            if (value > bestValue)
            {
                bestValue = value;
                // 防止出现递归未完成时，也调用了最优点
                // 当递归return到最初开启递归那层时，赋值最优点
                if (depth == currentDepth)
                {
                    bestMove = curMove;
                }
            }
        }
        else if (player == MAN)
        {
            if (value < bestValue)
            {
                bestValue = value;
                if (depth == currentDepth)
                {
                    bestMove = curMove;
                }
            }
        }
    }
    return bestValue;
}

// 电脑下子
int MainWindow::a_com_play() {
    // 可以不需要接收返回的最好值，因为已经直接改掉了bestMove
    a_miniMaxsearch(currentDepth);
    board[bestMove.x][bestMove.y] = COM;
    int place = (bestMove.x * 3) + bestMove.y;
    for (int i = 0; i < btnList.size(); i++) {
        if (i == place) {
            btnList[i]->setStyleSheet("border-image: url(:/fork.png);");
            btnList[i]->setEnabled(false);
        }
    }

    // 普通下子
    return 1;
}


int MainWindow::b_com_play()
{
    a_miniMaxsearch(currentDepth);
    board[bestMove.x][bestMove.y] = MAN;
    int place = (bestMove.x * 3) + bestMove.y;
    for (int i = 0; i < btnList.size(); i++) {
        if (i == place) {
            btnList[i]->setStyleSheet("border-image: url(:/ring.png);");
            btnList[i]->setEnabled(false);
        }
    }

    // 普通下子
    return 1;
}



// 人类下子
int MainWindow::a_man_play(QPushButton *btn)
{
    // 人类没有下子
    if(!btn)
        return -1;

    int x = btn->pos().x() / 100;
    int y = btn->pos().y() / 100;
    board[y][x] = MAN;
    btn->setStyleSheet("border-image: url(:/ring.png);");
    btn->setEnabled(false);

    // 普通下子
    return 1;
}

void MainWindow::on_reset_clicked()
{
    ending();
}


// ========================machineVSmachine==============================

//生成随机数，先手落子，这个是随机落子
int MainWindow::rand_X(int x)
{
    return rand()%x;
}

//先手落子
int MainWindow::randomInitial()
{
    int x = rand_X(3);
    int y = rand_X(3);
    cout<<board[x][y]<<endl;
    board[x][y] = COM;
    cout<<board[x][y]<<endl;
    int place = (x * 3) + y;
    //srand((int)time(0));//使用系统时间作为随机种子
    for (int i = 0; i < btnList.size(); i++) {
        if (i == place) {
            btnList[i]->setStyleSheet("border-image: url(:/fork.png);");
            btnList[i]->setEnabled(false);
        }
    }
}


int MainWindow::randomPlayer()
{
    int a;
    srand(time(0)); //初始化种子
    a = rand()%2; //产生0、1之间的随机数
    if(a==1){
        return a;
    }
    else if(a==0){
        a--;
        return a;
    }
}

void MainWindow::on_machineFight_clicked()
{
    cout<<"MACHINE VS MACHINE"<<endl;
    int i=0;
    randomInitial();
    // 深度减一
    currentDepth--;

    while(i<4){
        if(player == a_isWin()){
            QMessageBox::information(this, tr("井字棋"), tr("A赢了！"), QMessageBox::Ok);
            return;
        }
        else if(a_isDraw()){
            return;
        }
        b_com_play();


        if(player == a_isWin()){
            QMessageBox::information(this, tr("井字棋"), tr("B赢了！"), QMessageBox::Ok);
            return;
        }
        else if(a_isDraw()){
            return;
        }
        a_com_play();

        i++;
    }

    if(COM == a_isWin()){
        QMessageBox::information(this, tr("井字棋"), tr("A赢了！"), QMessageBox::Ok);
    }
    else if(MAN == a_isWin()){
        QMessageBox::information(this, tr("井字棋"), tr("B赢了！"), QMessageBox::Ok);
    }
    else{
        QMessageBox::information(this, tr("井字棋"), tr("平局！"), QMessageBox::Ok);
    }

    //player = randomPlayer();

}


