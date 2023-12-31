#include <iostream>
#include <istream>
#include <fstream>
#include <string.h>
#include <conio.h>
#include <stdlib.h>
#pragma warning(disable:4996)  
using namespace std;

class Student
{
public:
	char name[27];
	int Id;
	int Cnum;
	int Enum;
	int Mnum;
	int sum;

	Student*Next;
	Student*Head;
	Student*End;

	void CWHAddStu()
	{
		static int j = 0;
		cout << "请输入学生学号"; cin >> Id; CWHstu[j].Id = Id;
		j++;
	loop:	int a = j - 2;
		do
		{
			if (Id == CWHstu[a].Id)
			{

				cout << "对不起，该学号的同学的成绩已录入过，请重新输入学号！\n";
				cin >> Id;
				CWHstu[j].Id = Id;
				goto loop;
			}
			a--;
		} while (a >= 0);

		cout << "请输入学生姓名"; cin >> name;
		cout << "请输入C++课程的成绩"; cin >> Cnum;
		cout << "请输入数学课程的成绩"; cin >> Mnum;
		cout << "请输入英语课程的成绩"; cin >> Enum;
		sum = Cnum + Enum + Mnum;
	}

	void ReadFile(istream&in)
	{
		ifstream infile("SAVE.txt");
		in >> name >> Id >> Cnum >> Mnum >> Enum >> sum;
	}
	void Show()
	{
		cout << "   \t    " << Id << "     \t     " << name << "      \t       " << Cnum << "      \t   " << Mnum << "      \t      " << Enum << "          \t" << sum << endl;
	}
}CWHstu[27];




//CWHStudentmessage类
class CWHStudentmessage
{
public:
	CWHStudentmessage();
	~CWHStudentmessage();
	int CWHlistcount();
	void CWHShowMenu();
	void CWHFind();
	void CWHSave();
	void CWHModifyItem();
	void CWHRemoveItem();
	/*void CWHReadFile(istream&in);*/
	void CWHSwap(Student*, Student*);
	void CWHsort1();
	void CWHsort2();
	void CWHsort3();
	void CWHsort4();

	void CWHDisplay()
	{
		cout << "                -----------------------成绩单-----------------------" << endl;
		cout << "   \t     学号\t     姓名\t       C++\t   数学\t              英语\t        总成绩  " << endl;
		for (Student*p = Head->Next; p != End; p = p->Next)
			p->Show();
		cout << "请输入任何字符，继续。。。";
		getch();
	}
	void AddItem()
	{
		End->CWHAddStu();
		End->Next = new Student;
		End = End->Next;
		cout << "添加成功！" << endl;
		cout << "请输入任意字符继续。。";
		getch();
	}
private:
	Student*Head, *End;
	ifstream in;
	ofstream out;

	Student*FindItem(char*name)
	{
		for (Student*p = Head; p->Next != End; p = p->Next) //匹配成功则返回上一个指针，不成功则返回空。
			if (!strcmp(p->Next->name, name))return p;
		return NULL;
	}
	Student*FindID(int *Id)
	{
		for (Student*p = Head; p->Next != End; p = p->Next) //匹配成功则返回上一个指针，不成功则返回空。
			if (p->Next->Id == *Id)return p;

		return NULL;
	}
};

//构造函数******
CWHStudentmessage::CWHStudentmessage()
{
	Head = new Student;
	Head->Next = new Student;
	End = Head->Next;
	in.open("SAVE.txt");
	if (!in)
		cout << "无学生信息，请输入！" << endl;
	else
	{
		while (!in.eof())
		{
			End->ReadFile(in);
			if (End->name[0] == '\0')break;
			End->Next = new Student;
			End = End->Next;
		}
		in.close();
		cout << "\t\t成功读取学生信息" << endl;
	}
}

//***************析构函数**************
CWHStudentmessage::~CWHStudentmessage()
{
	CWHSave();
	for (Student*temp; Head->Head != End; )
	{
		temp = Head->Next;
		Head->Next = Head->Next->Next;
		delete temp;
	}
	delete Head, End;
}

//菜单menu
void CWHStudentmessage::CWHShowMenu()
{
	cout << "**************************************** " << endl;
	cout << "=======学生成绩管理系统=======" << endl;
	cout << "   =======1.添加学生成绩=======" << endl;
	cout << "   =======2.显示学生成绩=======" << endl;
	cout << "   =======3.查找学生成绩=======" << endl;
	cout << "   =======4.删除学生成绩=======" << endl;
	cout << "   =======5.修改学生成绩=======" << endl;
	cout << "   =======6.保存学生信息=======" << endl;
	cout << "   =======7.排序学生信息=======" << endl;
	cout << "\n\t\t\n\t\t请选择：";
}
//查找
void CWHStudentmessage::CWHFind()
{
	char name[27], Id[27];
	int x;
	Student*p = NULL;
	cout << "\t\t* 1.按学生姓名查找\n\t\t* 2.按学生学号查找";
	cout << "\n\t\t****************************************\n请选择：";
	cin >> x;
	switch (x)
	{
	case 1:
	{
		cout << "请输入要查找学生的姓名：";
		cin >> name;
		if (p = FindItem(name))
		{
			p->Next->Show();
			cout << "随意输入才能继续";
			getch();
		}
	}break;
	case 2:
	{
		cout << "请输入要查找学生的学号：";
		cin >> Id;
		if (p = FindItem(Id))
		{
			p->Next->Show();
			cout << "输入任意符号才能继续";
			getch();
		}
		else
		{
			cout << "\t\t没有找到该学号的学生。。";
			cout << "输入任意字符才能继续";
			getch();
		}
	}break;
	}
}

//修改信息***************
void CWHStudentmessage::CWHModifyItem()
{
	int x;
	char name[27], Id[27];
	Student*p = NULL;
	cout << "请选择 1.按姓名查询 2.按学号查询";
	cin >> x;
	switch (x)
	{
	case 1:
	{
		cout << "\t\t请输入要修改信息的学生的姓名：";
		cin >> name;
		if (p = FindItem(name))
		{
			cout << "已找到学生信息，请输入新的信息";
			p->Next->CWHAddStu();
			cout << "修改成功" << endl;
			cout << "输入任意字符才可继续~~~";
			getch();
		}
	}break;
	case 2:
	{
		cout << "\t\t请输入要修改信息的学生的学号：";
		cin >> Id;
		if (p = FindItem(Id))
		{
			cout << "已找到学生信息，请输入新的信息";
			p->Next->CWHAddStu();
			cout << "修改成功" << endl;
			cout << "输入任意字符才可继续" << endl;
			getch();
		}
		else
		{
			cout << "未找到该学生信息";
			cout << "输入任意字符继续";
			getch();
		}
	}
	}
}

//删除信息********************
void CWHStudentmessage::CWHRemoveItem()
{
	int x = 0;
	char name[27], Id[27];
	Student*p = NULL, *temp = NULL;
	cout << "请选择通过1.学生姓名 2.学生学号查找学生";
	cin >> name;
	switch (x)
	{
	case 1:
		cout << "请输入要删除学生的姓名";
		cin >> name;
		if (p = FindItem(name))
		{
			cout << "已找到所查找的学生！" << endl;
			temp = p->Next;
			p->Next = p->Next->Next;
			delete temp;
			cout << "删除成功";
			cout << "输入任意字符继续。。。。";

		}break;
	case 2:
		cout << "请输入要删除学生的学号";
		cin >> Id;
		if (p = FindItem(Id))
		{
			cout << "已找到所查找的学生！" << endl;
			temp = p->Next;
			p->Next = p->Next->Next;
			delete temp;
			cout << "删除成功";
			cout << "输入任意字符继续。。。。";
		}
		else
		{
			cout << "没有找到该学生！";
			cout << "输入任意字符继续";
			getch();
		}
	}

}


void  CWHStudentmessage::CWHSwap(Student*p1, Student*p2)
{
	Student*temp = new Student;
	strcpy(temp->name, p1->name);
	temp->Id, p1->Id;
	temp->Cnum = p1->Cnum;
	temp->Mnum = p1->Mnum;
	temp->Enum = p1->Enum;
	temp->sum = p1->sum;

	strcpy(p1->name, p2->name);
	p1->Id, p2->Id;
	p1->Cnum = p2->Cnum;
	p1->Mnum = p2->Mnum;
	p1->Enum = p2->Enum;
	p1->sum = p2->sum;

	strcpy(p2->name, temp->name);
	p2->Id, temp->Id;
	p2->Cnum = temp->Cnum;
	p2->Mnum = temp->Mnum;
	p2->Enum = temp->Enum;
	p2->sum = temp->sum;
}
//SORT***********
//
int CWHStudentmessage::CWHlistcount()
{
	if (!Head)
		return 0;
	int n = 0;
	for (Student*p = Head->Next; p != End; p->Next)
	{
		n++;
	}
	return n;
}

void CWHStudentmessage::CWHsort1()
{
	cout << "CWH-排序" << endl;
	Student*p = NULL, *k = NULL;
	for (p = Head->Next; p != End; p = p->Next)
	{
		for (k = Head->Next; k != End; k = k->Next)
		{
			if (p->Cnum > k->Cnum)
			{
				CWHStudentmessage::CWHSwap(p, k);
			}
		}
	}
	cout << "排序完成~" << endl;
	getch();
}
void CWHStudentmessage::CWHsort2()
{
	cout << "CWH-排序" << endl;
	Student*p = NULL, *k = NULL;
	for (p = Head->Next; p != End; p = p->Next)
	{
		for (k = Head->Next; k != End; k = k->Next)
		{
			if (p->Mnum > k->Mnum)
			{
				CWHStudentmessage::CWHSwap(p, k);
			}
		}
	}
	cout << "排序完成~" << endl;
	getch();
}
void CWHStudentmessage::CWHsort3()
{
	cout << "CWH-排序" << endl;
	Student*p = NULL, *k = NULL;
	for (p = Head->Next; p != End; p = p->Next)
	{
		for (k = Head->Next; k != End; k = k->Next)
		{
			if (p->Enum > k->Enum)
			{
				CWHStudentmessage::CWHSwap(p, k);
			}
		}
	}
	cout << "排序完成~" << endl;
	getch();
}
void CWHStudentmessage::CWHsort4()
{
	cout << "CWH-排序" << endl;
	Student*p = NULL, *k = NULL;
	for (p = Head->Next; p != End; p = p->Next)
	{
		for (k = Head->Next; k != End; k = k->Next)
		{
			if (p->sum > k->sum)
			{
				CWHStudentmessage::CWHSwap(p, k);
			}
		}
	}
	cout << "排序完成~" << endl;
	getch();
}
//保存函数************
void CWHStudentmessage::CWHSave()
{
	ofstream out("SAVE.txt", ios::out);
	for (Student*p = Head->Next; p != End; p = p->Next)
		out << p->name << "\t" << p->Id << "\t" << p->Cnum << "\t" << p->Mnum << "\t" << p->Enum << "\t" << p->sum << "\n";
	out.close();
}
//主函数
int main()
{
	int x, i = 0;
	bool quit = false;
	cout << "                              sssssssssssssssssssssssss" << endl;
	for (i = 0; i < 3; i++)
		cout << "\t\t0\t\t\t\t\t\t   0" << endl;
	cout << "                          777【欢迎进入学生成绩管理系统】777" << endl;
	for (i = 0; i < 3; i++)
		cout << "\t\t0\t\t\t\t\t\t   0" << endl;
	cout << "                             sssssssssssssssssssssssssss\n" << endl;
	CWHStudentmessage Grade;
	cout << "按任意键开始";
	getch();
	while (!quit)
	{
		system("cls");
		Grade.CWHShowMenu();
		cin >> x;
		switch (x)
		{
		case 0:quit = true;                        break;
		case 1:Grade.AddItem();				break;
		case 2:Grade.CWHDisplay();          break;
		case 3:Grade.CWHFind();              break;
		case 4:Grade.CWHRemoveItem(); break;
		case 5:Grade.CWHModifyItem();   break;
		case 6:Grade.CWHSave(); break;
		case 7:
			int x;
			cout << "请输入您希望排序的科目：1.c++ 2.数学 3.英语 4.总分" << endl;
			cin >> x;
			switch (x)
			{
				system("cls");
				Grade.CWHShowMenu();
			case 1:
				Grade.CWHsort1();
				break;
			case 2:
				Grade.CWHsort2();
				break;
			case 3:
				Grade.CWHsort3();
				break;
			case 4:
				Grade.CWHsort4();
				break;
			}
		}
	}
	return 0;
}
