# **Not_that_hard**.
## <u>**Catégorie**</u>

Reverse

## <u>**Description**</u> :

```
Un agent à voler un dossier confidentiel, cependant il à oublier de demander le mot de passe à la personne qu'il a volé. Trouvez ce mot de passe.

FORMAT DU FLAG : MCTF{password}
```

## <u>Hints</u> 

Hint 1 : Tout comprendre besoin tu n'as pas.

Hint 2 : Statique tu ne seras pas.

## <u>Auteur</u> 

ToRr0aN

## <u>Solution</u> :

Après avoir passer l'exécutable au decompilo (de ghidra pour ma part), on commence part essayer de comprendre le code du main.

On voit très vite que si la taille du string donnée en entrée n'est pas de 0xc (12) charactères,  alors l'app se ferme.

```c
puts("Give me your password : ");
__isoc99_scanf(&DAT_00102045,local_78); // <-- on voit ici que local_78 est l'entrée que l'on fournit
sVar1 = strlen(local_78);
if (sVar1 == 0xc) { // <-- check de la taille
  for (local_100 = 0; local_100 < 0xc; local_100 = local_100 + 1) {
    abStack144[local_100] =
         *(byte *)((long)&local_84 + (long)local_100) ^ (byte)local_c8[local_100];
  }
  for (local_fc = 0; local_fc < 0xc; local_fc = local_fc + 1) {
    if ((int)(char)abStack144[local_fc] - (int)local_78[local_fc] != local_f8[local_fc]) { // <-- on voit ici que la valeur entrée est utilisée pour une comparaison qui, si elle est réussit nous permet de passer le if et de valider le flag.
      puts("Wrong password.");
      goto LAB_00101431;
    }
  }
  printf("Good job ! Use this password as flag : %s\n",local_78);
}
else {
  puts("Wrong password.");
}
```


Nous pouvons essayer de lancer l'app en mettant un breakpoint sur le if qui utilise notre entrée voir ce qu'il se passe.

On voit que deux valeurs sont comparées, edx et eax. L'une des deux est fixe et l'autre varie en fonction de l'entrée.  
Pour obtenir l'égalité avec la première valeur, on voit qu'il faut 65. Le premier charactère est donc un 'e'.   
Après avoir la même chose pour chaque charactère, on trouve : **e4sy_R3vEr5e**

## **Flag : MCTF{e4sy_R3vEr5e}**