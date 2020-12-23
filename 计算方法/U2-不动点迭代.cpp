/*
 * @Author: your name
 * @Date: 2020-04-22 01:09:23
 * @LastEditTime: 2020-05-04 14:09:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \undefinedc:\Users\christan\Desktop\算法\U2-不动点迭代.cpp
 */
#include<iostream>
#include<iomanip>
#include<math.h>
using namespace std;

double fun(double x) 
{
    return pow((pow(x,5)-2*pow(x,2)+2)/3,1.0/3);

}

int main()
{
    double l = 1,r = 2;
    int t = 0;
    while(fabs(r - l) >= 0.000000001) 
    {
        l = r;           //第一次循环中x0
        r = fun(r);      //第一次循环中x1
        //cout<<"for："<<++t<<endl;
    }
    cout<<"GET:"<<endl;
    cout<<fixed<<setprecision(9)<<r<<endl;
    return 0;
}
