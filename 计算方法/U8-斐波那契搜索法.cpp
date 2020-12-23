/*
 * @Author: your name
 * @Date: 2020-04-23 16:15:10
 * @LastEditTime: 2020-04-24 20:37:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 */
#include<iostream>
#include<vector>
#include<limits>
#include<cmath>
#include<algorithm>
using namespace std;

vector<int> vect(46);
int feibo(int n){
    if(vect[n] != 0) return vect[n];
    int ans;
    if(n <= 1) ans = 1;
    else ans = feibo(n-1) + feibo(n-2);
    vect[n] = ans;
    return ans;
}
double func(double x){
    return x*x-sin(x);
}
int main(){
    feibo(45);
    double a,b,error;
    double pre_x=INT_MIN,pre_y=INT_MIN;
    //cin>>a>>b>>error;
    cout<<"please enter left:"<<endl;
    cin>>a;
    cout<<"please enter right:"<<endl;
    cin>>b;
    cout<<"please enter eps"<<endl;
    cin>>error;
    int n = lower_bound(vect.begin(),vect.end(),ceil(1/error)) - vect.begin();
    cout<<n<<endl;
    while(n>0){
        double l = (pre_x==INT_MIN)?(vect[n-1]*1.0*(b-a)/vect[n]):(pre_x - a);
        double x1 = a+l,x2 = b-l;
        double y1 = (x1==pre_x)?pre_y:func(x1);
        double y2 = (x2==pre_x)?pre_y:func(x2);
        if(x1 > x2){
            if(y1 < y2){
                a = x2;pre_x=x1;pre_y=y1;
            }else{
                b = x1;pre_x=x2;pre_y=y2;
            }
        }
        else{
            if(y1 < y2){
                b = x2;pre_x=x1;pre_y=y1;
            }else{
                a = x1;pre_x=x2;pre_y=y2;
            }
        }
        cout<<a<<" "<<b<<endl;
        --n;
    }
    return 0;
}