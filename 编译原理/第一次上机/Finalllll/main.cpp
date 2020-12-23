#include "LexAnalysis.h"


//运算符
set<string> op = {
	"+", "-", "*", "/", "=",
};

//括号
set<string> border = {"(", ")", "[", "]", "{", "}"};

unordered_set<string> gSymbols; //文法符号
unordered_set<string> VT; //终结符
unordered_set<string> VN; //非终结符
map<int, map<string, string>> Action; //ACTION表
map<int, map<string, string>> Goto; //GOTO表


//判断s是否为运算符
bool isOp(string s)
{
	if (op.count(s) == 1) return true;
	return false;
}

//判断s是否为界符
bool isBorder(string s)
{
	if (border.count(s) == 1) return true;
	return false;
}


//进行词法分析
void LexAnalyse()
{
	//读入正规文法
	string in;
	ifstream ifile_reg;
	ifile_reg.open("reg.txt", ios::in);

	//根据读入产生式构造NFA
	FA fa = FA();
	FANode nfaend = FANode("@"); //终态用"@"表示
	fa.endSet.insert(nfaend);
	while (ifile_reg)
	{
		ifile_reg >> in;
		fa.createNFA(in);
	}

	//NFA转换为DFA
	FA dfa = FA();
	fa.subset(dfa);


	//读入源代码，进行分析
	ifstream ifile_code;
	ifile_code.open("code.txt", ios::in);
	string path;
	FANode start = *dfa.startSet.begin();

	//输出token序列
	ofstream ofile_token;
	ofile_token.open("token.txt", ios::out);

	cout << "type" << "\t\ttoken" << endl;

	while (getline(ifile_code, in))
	{
		in = in.substr(in.find_first_not_of(" "));
		FANode state = start;
		for (int i = 0; i < in.length(); i++)
		{
			char c = ex(in[i]);
			if (c == ' ')
			{
				if (dfa.endSet.count(state) == 0)
				{
					cout << "error   " << "\t" << path << endl;
					return;
				}
				else
				{
					cout << judge(state, path) << "\t" << path << endl;
					ofile_token << judge(state, path) << endl;
				}
				state = start;
				path = "";
				continue;
			}
			if (dfa.endSet.count(state) == 1)
			{
				if (dfa.Dtran[state].find(c) != dfa.Dtran[state].end())
				{
					state = dfa.Dtran[state][c];
					path += in[i];
				}
				else
				{
					cout << judge(state, path) << "\t" << path << endl;
					ofile_token << judge(state, path) << endl;
					state = start;
					path = "";
					i--;
				}
				continue;
			}

			path += in[i];
			if (dfa.Dtran[state].find(c) == dfa.Dtran[state].end())
			{
				cout << "error   " << "\t" << path << endl;
				state = start;
				path = "";
				return;
			}
			else state = dfa.Dtran[state][c];
		}

		if (dfa.endSet.count(state) == 0)
		{
			cout << "error   " << "\t" << path << endl;
			return;
		}
		else
		{
			cout << judge(state, path) << "\t" << path << endl;
			ofile_token << judge(state, path) << endl;
		}
		state = start;
		path = "";
	}
	ofile_token << "#" << endl;
}

int main()
{
	LexAnalyse();
	return 0;
}
