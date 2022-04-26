#include <stdlib.h>
#include <stdio.h>

#define BUFF_SIZE 0x100

char buffer[BUFF_SIZE] = { 0x41, };
void (*pFunc)(char *) = (void *) (buffer-0x3030);

int main(int argc, char* argv[],  char* envp[])
{
	system("date");
	puts("\n"
		 "░░░░░░░                                          ░                                                                                 ░░░░░░░\n"
		 "░       ░░░░░  ░░░░░░ ░    ░  ░░░░  ░    ░      ░ ░   ░░░░░  ░    ░ ░ ░    ░ ░  ░░░░  ░░░░░ ░░░░░    ░░   ░░░░░ ░  ░░░░  ░    ░    ░        ░░░░  ░░░░░  ░    ░ ░    ░ ░        ░░   ░░░░░\n"
		 "░       ░    ░ ░      ░░   ░ ░    ░ ░    ░     ░   ░  ░    ░ ░░  ░░ ░ ░░   ░ ░ ░        ░   ░    ░  ░  ░    ░   ░ ░    ░ ░░   ░    ░       ░    ░ ░    ░ ░░  ░░ ░    ░ ░       ░  ░  ░    ░\n"
		 "░░░░░   ░    ░ ░░░░░  ░ ░  ░ ░      ░░░░░░    ░     ░ ░    ░ ░ ░░ ░ ░ ░ ░  ░ ░  ░░░░    ░   ░    ░ ░    ░   ░   ░ ░    ░ ░ ░  ░    ░░░░░   ░    ░ ░    ░ ░ ░░ ░ ░    ░ ░      ░    ░ ░    ░\n"
		 "░       ░░░░░  ░      ░  ░ ░ ░      ░    ░    ░░░░░░░ ░    ░ ░    ░ ░ ░  ░ ░ ░      ░   ░   ░░░░░  ░░░░░░   ░   ░ ░    ░ ░  ░ ░    ░       ░    ░ ░░░░░  ░    ░ ░    ░ ░      ░░░░░░ ░░░░░\n"
		 "░       ░   ░  ░      ░   ░░ ░    ░ ░    ░    ░     ░ ░    ░ ░    ░ ░ ░   ░░ ░ ░    ░   ░   ░   ░  ░    ░   ░   ░ ░    ░ ░   ░░    ░       ░    ░ ░   ░  ░    ░ ░    ░ ░      ░    ░ ░   ░\n"
		 "░       ░    ░ ░░░░░░ ░    ░  ░░░░  ░    ░    ░     ░ ░░░░░  ░    ░ ░ ░    ░ ░  ░░░░    ░   ░    ░ ░    ░   ░   ░  ░░░░  ░    ░    ░        ░░░░  ░    ░ ░    ░  ░░░░  ░░░░░░ ░    ░ ░    ░\n"
		 "\n");

	puts(" Let's begin with something simple. What is your name ? :\n");

	read(0, buffer, BUFF_SIZE + 1);
	//fgets(buffer, BUFF_SIZE + 4, stdin);
	
	puts("\n Here is what you typed :\n");
	pFunc(buffer);

	puts("\n Sorry, you can't go further because our service is not available due to a technical issue, try again later...\n");

	return 0;
}
