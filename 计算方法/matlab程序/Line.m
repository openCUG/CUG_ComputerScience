function [A,B]=Line(X,Y)
%Input -X is the 1xn abscissa vector
% -Y is the 1xn ordinate vector
%Output -A is the coeefficientof x in Ax + B
% -B is the constant coefficient in Ax + B
xmean=mean(X);
ymean=mean(Y);
sumx2=(X-xmean)*(X-xmean)';
sumxy=(Y-ymean)*(X-xmean)';
A=sumxy/sumx2;
B=ymean-A*xmean;