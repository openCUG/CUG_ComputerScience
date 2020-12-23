/*
 * @Author: your name
 * @Date: 2020-04-23 11:19:00
 * @LastEditTime: 2020-04-23 11:20:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \算法\U7_Certainstep.java
 */

//import java.util.ArrayList;
//import java.util.Scanner;

public class U7_Certainstep {
    public static double fun(double a) {
        double b = Math.sin(a) / a;
        return b;
    }

    public static void Trapezoid(){
        //double[] yPoint = new double[7];
        //int n = 8,index=0;
        double T=0,a=0,b=1;
        while(a<0.875){
            a=a+0.125;
            T+=fun(a);
        }
        double I = (0.125/2)*(fun(a)+2*T+fun(b));
        System.out.println("复化梯形公式计算得出："+I);
    }

    public static void Simpson(){
        double h=0.25,a=0,b=1,k=0.8771925739840309;
        double x = a+h/2;
        double s1=fun(x),s2=0;
        for(int i=1;i<4;i++){
            s1 = s1 + fun(x+i*h);
            s2 = s2 + fun(a+i*h);
        }
        double s = h*(k+4*s1+2*s2+fun(b))/6;
        System.out.print("复化辛普森计算得出："+s);
    }

    public static void certainStep(double a,double b,double eps){
        boolean done = false;
        int n = 1;
        double h=b-a;
        double tn = h*(0.8771925739840309+fun(b))/2;
        double t2n;
        do{
            double sum = 0;
            for(int k=0;k<n;k++){
                double x = a+(k+0.5)*h;
                sum += fun(x);
            }
            t2n = (tn+h*sum)/2.0;
            if(Math.abs(tn-t2n)<eps){
                done = true;
            }
            else{
                tn = t2n;
                n *= 2;
                h /= 2;
            }
        }while(!done);
        //System.out.println("\n");
        System.out.println("\n"+"通过变步长梯形法计算得出："+t2n);
    }

    public static void main(String args[]){
        Trapezoid();
        Simpson();
        certainStep(0,1,0.025);
    }

}