/*
 * Program Name : MyLs
 * version beta 4
 * Functions :      ls [directors] -options "argument"     //hint: []select directors , --must follow -!!!
 *                  ls           :display the directors and files in currunt directors without "."
 *                  ls -a        :display all the directors and files in currunt directors
 *                  ls -l        :display the mode , links , user name , group name , size , last modified time
 *                  ls -q "time"/"size"/"name"/"link"
 *                  ls -u "name" : display the files whose author name == name
 *                  ls [director]: display the files and direcotrs in the fixed director //hint: director,the whole path!!!
 *                  ls -R        :recursion display the files and directors in the sub-directors of the current directors
 *                  ls -1        :display one file in one line
 *                  ls -s        :display block
 * Explain  :       uRlaS1s tsnl
 *
 *
 *
bgcolr:40----49
40:black
41:dark red
42:green
43:yellow
44:blue
45:purple
46:dark green
47:white

ftcolr:30----39
30:black
31:red
32:green
33:yellow
34:blue
35:purple
36:dark green
37:white
 *
 */
#include<stdio.h>
#include<sys/types.h>
#include<sys/stat.h>
#include<string.h>
#include<pwd.h>
#include<dirent.h>
#include<grp.h>
#include<unistd.h>
#include<malloc.h>

#define MAXNAMESIZE 128

#define ISa (0x00000001)
#define ISb (0x00000002)
#define ISc (0x00000004)
#define ISd (0x00000008)
#define ISe (0x00000010)
#define ISf (0x00000020)
#define ISg (0x00000040)
#define ISi (0x00000080)
#define ISk (0x00000100)
#define ISl (0x00000200)
#define ISm (0x00000400)
#define ISn (0x00000800)
#define ISo (0x00001000)
#define ISp (0x00002000)
#define ISq (0x00004000)
#define ISr (0x00008000)
#define ISs (0x00010000)
#define ISt (0x00020000)
#define ISu (0x00040000)
#define ISx (0x00080000)
#define ISA (0x00100000)
#define ISB (0x00200000)
#define ISC (0x00400000)
#define ISG (0x00800000)
#define ISL (0x01000000)
#define ISN (0x02000000)
#define ISQ (0x04000000)
#define ISR (0x08000000)
#define ISS (0x10000000)
#define ISX (0x20000000)
#define IS1 (0x40000000)

#define BYMTIME 0x8
#define BYSTSIZE 0x4
#define BYFNAME 0x2
#define BYNLINK 0x1


#define FORMAT_LDIR ("\033[1;34m  %-8s\n\033[0m")
#define FORMAT_SDIR ("\033[1;34m%s  \033[0m")

#define FORMAT_LREG ("\033[1;35m  %-8s\n\033[0m")
#define FORMAT_SREG ("\033[1;35m%s  \033[0m")
//#define DEBUG 0

struct ConBit {
    unsigned int cb, sort; //control block
} CB;

/*
#define S_ISFIFO( m ) ( ( (m) & (S_IFMT) ) == ( 0010000) )
#define S_ISDIR( m )  ( ( (m) & (S_IFMT) ) == (0040000))
#define S_ISCHR(m) ( ( (m) & (S_IFMT) ) ==( 0020000))
#define S_ISBLK(m) ( ( (m) & (S_IFMT) ) ==(0060000))
#define S_ISREG(m) ( ( (m) & (S_IFMT) ) ==(0100000))
 */

struct ls {
    char fname[256];
    struct stat info;
    struct ls** next;
    struct ls** back;
};


char *b_opt_arg; //argument of options
int cnt;
struct ls **buffer, **head, **tail;
//***************Compare Block**************************************************

int cmp_nlink(const void * a, const void * b) {
    return ((struct ls*) a)->info.st_nlink - ((struct ls*) b)->info.st_nlink;
}

int cmp_st_size(const void * a, const void * b) {
    return ((struct ls*) a)->info.st_size - ((struct ls*) b)->info.st_size;
}

int cmp_mtim(const void * a, const void * b) {
    return -(int) (((struct ls*) a)->info.st_mtim.tv_sec - ((struct ls*) b)->info.st_mtim.tv_sec);
}

int cmp_fname(const void * a, const void * b) {
    int t = strcmp(((struct ls*) a)->fname, ((struct ls*) b)->fname);
    return t > 0 ? 1 : -1;
}
//******************************************************************************

void InsertSort(struct ls** pData, int ( *compare)(const void* a, const void* b)) {
    if (pData == NULL) return;
    struct ls** p;
    struct ls** q;
    for (p = (*pData)->next; p != NULL; p = (*p)->next) {
        for (q = (*p)->back; q != NULL && (compare(*p, *q)) < 0; q = (*q)->back);

        (*((*p)->back))->next = (*p)->next;
        if ((*p)->next)
            (*((*p)->next))->back = (*p)->back;

        if (q) {
            (*p)->back = q;
            (*p)->next = (*q)->next;
            if ((*p)->next)
                (*((*q)->next))->back = p;
            (*q)->next = p;
        } else {
            (*p)->back = NULL;
            (*p)->next = head;
            (*head)->back = p;
            head = p;
        }
    }
}

/*
void Qsort ( void * begin_t ,void *end_t  ,  int ( *compare)(const void* a, const void* b ) )
{
    struct ls **low=(struct ls**)begin_t,**up = (struct ls**)end_t , **p,**q,**t;
    if ( low!=up )
    {
        p=low,q=up;
        t=low;
        while ( p!=q )
        {
            while ( p!=q && compare(*q,*t) )
                q=(*q)->back;
            if ( p!=q ) {
                p=q;
                p=(*p)->next;
            }
        }
    }
}
 */

char numbuf[16];

char* uid_to_name(uid_t uid) {
    if (getpwuid(uid)) {
        char* pw_ptr = getpwuid(uid)->pw_name;
        if (pw_ptr)
            return pw_ptr;
    }
    fprintf(numbuf, "%d", uid);
    return numbuf;
}

char* gid_to_name(gid_t gid) {
    char *gr_ptr = getgrgid(gid)->gr_name;
    if (gr_ptr)
        return gr_ptr;
    char numstr[10];
    fprintf(numstr, "%d", gid);
    return numstr;
}

void mode_to_letters(int mode, char *str) {
    strcpy(str, "----------");

    if (S_ISDIR(mode)) str[0] = 'd';
    if (S_ISCHR(mode)) str[0] = 'c';
    if (S_ISBLK(mode)) str[0] = 'b';

    if (mode & S_IRUSR) str[1] = 'r';
    if (mode & S_IWUSR) str[2] = 'w';
    if (mode & S_IXUSR) str[3] = 'x';

    if (mode & S_IRGRP) str[4] = 'r';
    if (mode & S_IWGRP) str[5] = 'w';
    if (mode & S_IXGRP) str[6] = 'x';

    if (mode & S_IROTH) str[7] = 'r';
    if (mode & S_IWOTH) str[8] = 'w';
    if (mode & S_IXOTH) str[9] = 'x';
}

void store_file_info(char* fname, struct stat* buf) {

    if (fname[0] == '.' && !(CB.cb & ISa)) return;
    struct ls** p = (struct ls**) (malloc(sizeof (struct ls*)));
    *p = (struct ls*) malloc(sizeof (struct ls));
    (*p)->next = NULL;
    (*p)->back = buffer;
    (*p)->info = (*buf);
    strcpy((*p)->fname, fname);
    if (buffer == NULL) {
        head = buffer = p;
    } else {
        (*buffer)->next = p;
        buffer = p;
    }
    tail = buffer;
    cnt++;

}

void dostat(char* fname) {
    struct stat info;
    char *namep;
    if (stat(fname, &info) == -1) {
        perror(fname);
        return;
    } else {
        namep = fname;
        fname = strrchr(namep, '/'); //cut prefix
        store_file_info(fname == 0 ? namep : fname + 1, &info);
        return;
    }
}

void sort() {
    if (!(CB.cb & ISS)) return;
    switch (CB.sort) {
        case BYMTIME:
            InsertSort(buffer, cmp_mtim);
            break;
        case BYFNAME:
            InsertSort(buffer, cmp_fname);
            break;
        case BYSTSIZE:
            InsertSort(buffer, cmp_st_size);
            break;
        case BYNLINK:
            InsertSort(buffer, cmp_nlink);
            break;
        default:
            break;
    }
}

void show_file_info() {
    //printf("Block Number=%d,    Number of Directions(files)=%d\n\n", block, cnt);
    void mode_to_letters(int, char*);
    char* uid_to_name(uid_t);
    char* gid_to_name(gid_t);
    int i, j, block = 0;
    struct ls** p;
    char strmode[11], strusr[11], strgrp[11];
    // show -l list
    if (CB.cb & ISl) {
        for (j = 0, p = head; p; p = (*p)->next) {

            strcpy(strusr, uid_to_name((*p)->info.st_uid));
            strcpy(strgrp, gid_to_name((*p)->info.st_gid));
            if (CB.cb & ISu && strcmp(strusr, b_opt_arg)) continue;
            if (CB.cb & ISs)
                printf("%04d", (*p)->info.st_blocks / 2);
            mode_to_letters((*p)->info.st_mode, strmode);
            printf("%8s", strmode);
            printf("%4d", (int) (*p)->info.st_nlink);
            printf("  %-8s", strusr);
            printf("%-8s", strgrp);
            printf("%8ld", (*p)->info.st_size);
            printf("  %.12s", 4 + ctime(&(*p)->info.st_mtim));
            if (S_ISDIR((*p)->info.st_mode))
                printf(FORMAT_LDIR, (*p)->fname);
            else
                if (S_ISREG((*p)->info.st_mode))
                printf(FORMAT_LREG, (*p)->fname);
            else
                printf("  %-8s\n", (*p)->fname);
            block += (*p)->info.st_blocks;
            j++;

        }
        printf("\nTotal files(directors) = %d, and Total Block = %d\n", j, block / 2);
        return;
    }
    // show simple list
    if (CB.cb & ISC) {

    } else {
        for (j = 0, p = head; p; p = (*p)->next) {

            strcpy(strusr, uid_to_name((*p)->info.st_uid));

            if (CB.cb & ISu && strcmp(strusr, b_opt_arg)) continue;
            if (j && !(CB.cb & IS1))
                printf("    ");
            if (CB.cb & ISs)
                printf("%d ", (*p)->info.st_blocks / 2);
            if (S_ISDIR((*p)->info.st_mode))
                printf(FORMAT_SDIR, (*p)->fname);
            else
                if (S_ISREG((*p)->info.st_mode))
                printf(FORMAT_SREG, (*p)->fname);
            else
                printf("%s", (*p)->fname);
            if (CB.cb & IS1)
                puts("");
            block += (*p)->info.st_blocks / 2;
            j++;
        }
        if (CB.cb & ISs)
            printf("\nTotal Blocks = %d", block);
        printf("\nTotal files(directors) = %d.\n", j);
    }
}

void do_ls(char* dirname) {
    DIR *dir_ptr;
    struct dirent * direntp;
    char *fpath;
    int i;
    struct ls** p;
    struct ls** t;
    struct ls* q;
    if ((dir_ptr = opendir(dirname)) == NULL)
        fprintf(stderr, "myls:cannot open %s\n", dirname);
    else {
        cnt = 0;
        fpath = (char*) malloc(strlen(dirname) + 1 + MAXNAMESIZE + 1);
        while ((direntp = readdir(dir_ptr)) != NULL) {
            strcpy(fpath, dirname);
            strcat(fpath, "/");
            strcat(fpath, direntp->d_name);
            dostat(fpath);
        }
        buffer = head;
        free(fpath);
        closedir(dir_ptr);
        sort();
        show_file_info();
        /////////////release memory//////////
        for (p = head; p;) {
            q = (*p);
            t = q->next;
            free(q);
            free(p);
            p = t;
        }
        head = buffer = 0;
        ////////////////////////////////////
    }
}

void rec_show(char* dirname) {
    DIR *dir_ptr;
    struct stat info;
    struct dirent * direntp;
    char *fpath;
    int i;
    printf("\033[1;32m%s:\n\033[0m", dirname);
    do_ls(dirname);

    printf("\n\n");
    if ((dir_ptr = opendir(dirname)) == NULL) {
        fprintf(stderr, "myls:cannot open %s\n", dirname);
        return;
    }
    fpath = (char*) malloc(strlen(dirname) + 1 + MAXNAMESIZE + 1);
    while ((direntp = readdir(dir_ptr)) != NULL) {
        if (!(CB.cb & ISa) && direntp->d_name[0] == '.') continue;
        if (strcmp(direntp->d_name, ".") && strcmp(direntp->d_name, "..")) {
            strcpy(fpath, dirname);
            strcat(fpath, "/");
            strcat(fpath, direntp->d_name);
            if (stat(fpath, &info) == -1) {
                perror(fpath);
                break;
            } else {
                if (S_ISDIR(info.st_mode)) {
                    rec_show(fpath);
                }
            }

        }
    }
    free(fpath);
    closedir(dir_ptr);
}

int main(int argc, char **argv) {

    int oc;
    char* dir = NULL;
    head = buffer = NULL;
    if (argc > 1 && argv[1][0] == '/') {
        dir = argv[1];
        argc--;
        argv++;
    }
    CB.cb = CB.sort = 0;
    while ((oc = getopt(argc, argv, "u:RlaS:1s")) != -1) {
        switch (oc) {
            case 'S':
                CB.cb |= ISS;
                b_opt_arg = optarg;
#ifdef DEBUG
                printf("the option is -q\nthe sort way is %s\n", optarg);
#endif
                if (strcmp("time", optarg) == 0)
                    CB.sort = BYMTIME;
                else
                    if (strcmp("size", optarg) == 0)
                    CB.sort = BYSTSIZE;
                else
                    if (strcmp("link", optarg) == 0)
                    CB.sort = BYNLINK;
                else
                    if (strcmp("name", optarg) == 0)
                    CB.sort = BYFNAME;
                else {
                    printf("arguments error!\n");
                    return 1;
                }
#ifdef DEBUG
                printf("%d\n", CB.cb);
#endif
                break;
            case 'a':
#ifdef DEBUG
                printf("the option is -a\n");
#endif

                CB.cb |= ISa;
                break;
            case 'l':
#ifdef DEBUG
                printf("the option is -l\n");
#endif

                CB.cb |= ISl;
                break;
            case 'u':
                b_opt_arg = optarg;
#ifdef DEBUG
                printf("the option is -u\nfilename is %s\n", optarg);
#endif

                CB.cb |= ISu;
                break;
            case 'R':
#ifdef DEBUG
                printf("the option is -R\n");
#endif

                CB.cb |= ISR;
                break;

            case 'C':
#ifdef DEBUG
                printf("the option is -c\n");
#endif

                CB.cb |= ISC;
                break;

            case '1':
                CB.cb |= IS1;
                break;
            case 's':
                CB.cb |= ISs;
                break;
            case '?':
                printf("arguments error!\n");
                break;
        }
    }
    if (CB.cb & ISR) {
        if (dir)
            rec_show(dir);
        else
            rec_show(".");
    } else {
        if (dir)
            do_ls(dir);
        else
            do_ls(".");
    }
    return 0;
}

