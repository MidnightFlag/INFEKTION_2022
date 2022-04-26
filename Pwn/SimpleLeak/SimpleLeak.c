#include <stdlib.h>
#include <stdio.h>

#define BUFF_SIZE 0x10

char flag[] = "M\0C\0T\0F\0{\0T\0h\0i\0s\0_\0I\0s\0_\0N\0o\0t\0_\0T\0h\0e\0_\0R\0e\0a\0l\0_\0F\0l\0a\0g\0}";

int main()
{
   char choice[BUFF_SIZE] = {0, };
	char name[BUFF_SIZE] = {0, };
	char surname[BUFF_SIZE] = {0, };

	printf("\n Hello :D\n I am a super simple program, I will simply ask for your name and then print it back to you :)\n Are you fine with this ?\n");
   fgets(choice, BUFF_SIZE, stdin);
   printf(" OK, you said : \n");
   printf(choice);

   printf("\n Type your name here :\n");
	fgets(name, BUFF_SIZE, stdin);

   printf("\n And your surname here :\n");
	fgets(surname, BUFF_SIZE, stdin);

	printf("\n Ok ! Thx buddy, your name is :\n");
	printf(name);
	printf("\n And your surname is : \n");
	printf(surname);

	printf("\n Bye !\n");

	return 0;
}
