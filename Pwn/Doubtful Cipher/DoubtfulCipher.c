#include <stdlib.h>
#include <stdio.h>

#define BLOCK_SIZE 32

FILE* destFile = NULL;
char delimiter[2] = {0x0a, };

void cipher(char key[32], char msg[32])
{
	for (unsigned int i=0; i<BLOCK_SIZE; i++)
	{
		if(msg[i] == 0x00) { break; }
		msg[i] ^= key[i];
	}
}

int main(int argc, char *argv[], char *envp[])
{
	char flag_key[BLOCK_SIZE] = "________________________________"; // On the remote process, the flag_key is different. You don't know it.
	char user_key[BLOCK_SIZE] = {0, };
	
	char flag[BLOCK_SIZE+1] = "MCTF{Care--This_Is_A_Fake_Flag!}\x00"; // On the remote process, the flag is different. You have to manage to leak it !
	char user[BLOCK_SIZE+1] = {0, };

	printf("\n Hey buddy ! I wrote a simple code to keep my flag secret eheh.\n");
	printf("\n I am kinda proud of it, so I decided to make this service available for anyone willing to use it :)\n");
	printf(" As a proof of its robustness, I even print out my own encrypted flag.\n");
	printf(" I am really confident about this, because my programs rocks ;)\n");
	
	printf("\n Simply provide a cipher key : \n");
	read(0, user_key, BLOCK_SIZE*2);

	printf("\n Now, enter the secret you want to hide (This program wont keep any cleartext, don't worry :p)\n");
	read(0, user, BLOCK_SIZE);

	destFile = fopen("/cipher.log", "ab+");
	if (destFile == NULL)
	{
		printf("\n Oops, something went wrong ... :( \n");
		return 3;
	}

	fwrite(user, 1, BLOCK_SIZE, destFile);
	fwrite(delimiter, 1, 2, destFile);

	fclose(destFile);

	cipher(user_key, user);
	cipher(flag_key, flag);

	printf("\n Here is my encrypted cipher, as an example   : %s\n", flag);
	printf(" And here is your own hardly encrypted secret : %s\n", user);

	printf("\n Thank you for your trust, and see you soon :)\n");

	return 0;
}
