#include <stdlib.h>
#include <stdio.h>
#include <unistd.h>
#include <sys/stat.h>
#include <fcntl.h>

FILE* fp = NULL;

int main(int argc, char *argv[], char *envp[])
{
	printf("\n [Noiche] Hi dude. This is a PoC for a secure file read.\n");
	printf(" [Noiche] It checks the permisssions associated with the real user id instead of the effective user id.\n");
	printf(" [Noiche] I might use this in production for others projects, so I wanted to make sure this is safe.\n");
	printf(" [Noiche] Could you please stress-test this access-control for me ?\n");

	if (argc != 2)
	{
		printf("\n [Usage] %s [file full path]\n", argv[0]);
		return -1;
	}

	// This is a setuid binary, owned by superuser, let's elevate our privileges
	seteuid(geteuid());


	if (access(argv[1], R_OK) != 0)
	{
		printf("\n [Error] File not found / Permission denied : read(%s)\n", argv[1]);
		return -2;
	}

	// That is a PoC, in real conditions we might have more code here
	// This sleep simply simulate the missing code, don't mind it :)
	sleep(1);

	fp = fopen(argv[1], "rb");
	if (fp == NULL)
	{
		printf("\n [Error] Could not open the file : %s\n", argv[1]);
		return -3;
	}

	struct stat st;
	stat(argv[1], &st);
	long size = st.st_size;

	char* secret = (char *) malloc(size);
	fread(secret, size, 1, fp);
	fclose(fp);

	printf("\n [Result] Here is the content of the file %s : %s\n", argv[1], secret);

	return 0;
}
