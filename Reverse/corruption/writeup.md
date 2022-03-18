# **Corruption**
## **Catégorie**

Reverse

## **Description**

```
Dans un effort de lutte contre la corruption parmi les politiques soviétiques les plus hauts placés, le chef suprême a ordonné la création d'un logiciel qui puisse détecter la corruption parmi les hommes. Pour ce faire, le logiciel se sert d'intelligence artificielle très primitive pour détecter les petits secrets du sujet d'une investigation. Les prémices d'une blockchain sont également montés dans le logiciel afin d'en garantir l'intégrité physique, de plus que l'ajout dans le cloud de protections as a service, qui devraient assurer que les interrogés ne puissent pas esquiver trop de questions.

Lors de ce challenge, vous devrez reverser un programme qui n'a pas de rapport particulier avec ce logiciel afin de prouver vos compétences.
```

## Hints

1) Il n'est pas nécessaire d'analyser la fonction `print_flag`.

2) Comment sont représentés les nombres négatifs en mémoire ?

## Auteur

SeulAParis

## Solution

Dans ce writeup, je vais aller droit au but et ignorer toutes les phases de recherche inhérentes à n'importe quel challenge de reverse.

Les trois fonctions dans lesquelles il est pertinent de plonger sont les fonctions `main`, `getint` et `parseint`.

On pourrait en analyser le code assembleur, les passer dans un décompilateur ou autre, ce qui compte est d'en obtenir une bonne compréhension. Ici, après les avoir passé dans le décompilateur de ghidra de cutter on obtient ça :

```c
uint32_t parseint(void *arg1)
{
    void *var_18h;
    uint32_t var_8h;
    int64_t var_4h;
    
    var_4h._0_4_ = 0;
    var_8h = 0;
    while (*(char *)((int64_t)arg1 + (int64_t)(int32_t)var_4h) != '\0') {
        if (0x19999998 < var_8h) {
            exit_with_insult("Number is too big");
        }
        if (('9' < *(char *)((int64_t)arg1 + (int64_t)(int32_t)var_4h)) &&
           (*(char *)((int64_t)arg1 + (int64_t)(int32_t)var_4h) < '0')) {
            exit_with_insult("Number is not number");
        }
        if (~((int32_t)*(char *)((int64_t)arg1 + (int64_t)(int32_t)var_4h) - 0x30U) < var_8h * 10) {
            exit_with_insult("Number too big");
        }
        var_8h = (var_8h * 10 + (int32_t)*(char *)((int64_t)arg1 + (int64_t)(int32_t)var_4h)) - 0x30;
        var_4h._0_4_ = (int32_t)var_4h + 1;
    }
    return var_8h;
}

undefined8 getint(void *arg1, undefined8 arg2)
{
    char cVar1;
    void *var_18h;
    int64_t var_4h;
    
    var_4h._0_4_ = 0;
    while ((((int32_t)var_4h < (int32_t)arg2 && (cVar1 = getc(_reloc.stdin), cVar1 != '\n')) && (cVar1 != -1))) {
        if (('9' < cVar1) && (cVar1 < '0')) {
            return 0;
        }
        *(char *)((int64_t)(int32_t)var_4h + (int64_t)arg1) = cVar1;
        var_4h._0_4_ = (int32_t)var_4h + 1;
    }
    return 1;
}

undefined8 main(undefined8 argc, char **argv)
{
    int32_t iVar1;
    char *pcVar2;
    char *arg1;
    char **var_30h;
    int64_t var_24h;
    int64_t var_18h;
    void *var_10h;
    void *ptr;
    
    pcVar2 = (char *)calloc(0xffffff, 1);
    arg1 = (char *)calloc(0x20, 1);
    puts("Enter number:");
    iVar1 = getint(arg1, 0x1f);
    if (iVar1 == 0) {
        exit_with_insult("This is not number");
    }
    iVar1 = parseint(arg1);
    iVar1 = iVar1 + 0x133769;
    if ((0xffffff < iVar1) || (iVar1 < 0)) {
        exit_with_insult("You fail");
    }
    pcVar2[iVar1] = 'B';
    if (*pcVar2 != 'B') {
        exit_with_insult("You fail");
    }
    puts("Ok. Cool. Bravo.");
    print_flag(arg1);
    free(pcVar2);
    free(arg1);
    return 0;
}
```

Ensuite, on nettoie le code obtenu afin d'avoir quelque chose de plus lisible. Quelques petites astuces pour le faire sont :
- de virer toutes les déclarations de variables superflues en début de fonction (qui sont souvent mal typées, et qui au final n'apportent rien à la compréhension mais prennent de la place quand même).
- de remplacer les boucles "while" qui peuvent l'être par des boucles for (encore une fois, plus compactes et plus compréhensibles).
- de renommer les variables quand on a compris ce qu'elles faisaient.
- de virer tous les casts (les "`(int64_t)`" qui précèdent certains noms de variables).
- de remplacer les trucs du genre `*(char *)((int64_t)arg1 + (int64_t)(int32_t)var_4h)` par des choses comme `arg1[var_4h]`, qui représentent strictement la même chose mais qui sont... plus compactes et plus compréhensibles.
- ...

```c
uint32_t parseint(void *arg1) {
    var_8h = 0;
    for(i = 0 ; arg1[i] != '\0' ; i++) {
        if(0x19999998 < var_8h) {
            exit_with_insult("Number is too big");
        }
        if(('9' < arg1[i]) && (arg1[i] < '0')) {
            exit_with_insult("Number is not number");
        }
        if(~(arg1[i] - 0x30) < var_8h * 10) {
            exit_with_insult("Number too big");
        }
        var_8h = (var_8h * 10 + arg1[i]) - 0x30;
    }
    return var_8h;
}

undefined8 getint(void *arg1, undefined8 arg2) {
    for(i = 0 ; (i < arg2 && (newchar = getc(stdin), newchar != '\n')) && (newchar != -1) ; i++) {
        if (('9' < newchar) && (newchar < '0')) {
            return 0;
        }
        arg1[i] = newchar;
    }
    return 1;
}

undefined8 main(undefined8 argc, char **argv) {
    pcVar2 = (char*) calloc(0xffffff, 1);
    arg1 = (char*) calloc(0x20, 1);
    puts("Enter number:");
    if(getint(arg1, 0x1f) == 0) {
        exit_with_insult("This is not number");
    }
    iVar1 = parseint(arg1) + 0x133769;
    if((0xffffff < iVar1) || (iVar1 < 0)) {
        exit_with_insult("You fail");
    }
    pcVar2[iVar1] = 'B';
    if(pcVar2[0] != 'B') {
        exit_with_insult("You fail");
    }
    puts("Ok. Cool. Bravo.");
    print_flag(arg1);
    free(pcVar2);
    free(arg1);
    return 0;
}
```

On peut pousser le vice encore plus loin : quand a vraiment compris ce que faisait une fonction, on peut simplement la remplacer par une phrase :

```c
uint32_t parseint(void *arg1) {
	// transforme une chaine de caractères en nombre entier
	// la chaine de caractères ne doit contenir que des caractères de '0' à '9', et le nombre résultant doit être entre 0 et 0xffffffff
}

undefined8 getint(void *arg1, undefined8 arg2) {
	// prend une entrée utilisateur, qui ne doit contenir que des caractères de '0' à '9'
}

undefined8 main(undefined8 argc, char **argv) {
    pcVar2 = (char*) calloc(0xffffff, 1);
    arg1 = (char*) calloc(0x20, 1);
    puts("Enter number:");
    if(getint(arg1, 0x1f) == 0) {
        exit_with_insult("This is not number");
    }
    iVar1 = parseint(arg1) + 0x133769;
    if((0xffffff < iVar1) || (iVar1 < 0)) {
        exit_with_insult("You fail");
    }
    pcVar2[iVar1] = 'B';
    if(pcVar2[0] != 'B') {
        exit_with_insult("You fail");
    }
	// you win
}
```

Il reste une simplification conceptuelle à faire. En effet, le code suivant peut être remodelé de la manière suivante :

```c
    iVar1 = parseint(arg1) + 0x133769;
    if((0xffffff < iVar1) || (iVar1 < 0)) {
        exit_with_insult("You fail");
    }
    pcVar2[iVar1] = 'B';
    if(pcVar2[0] != 'B') {
        exit_with_insult("You fail");
    }
```

```c
    if(parseint(arg1) + 0x133769 != 0) {
        exit_with_insult("You fail");
    }
```

On en arrive à un point où on peut très bien représenter le problème :

- Nous ne pouvons passer que des nombres entiers positifs comme entrées au programme (et inférieurs ou égaux à 0xffffffff).
- Le nombre passé en entrée au programme doit respecter la condition suivante : `nombre + 0x133769 == 0`.

Sauf que... un nombre positif supérieur à zéro auquel on ajoute un autre nombre positif ne peut pas être égal à 0 ??

Hé ben si ! En effet, si on s'intéresse à la représentation des nombres entiers en mémoire, on se souvient d'une vulnérabilité connue qu'est le dépassement d'entier (ou integer overflow), où l'incrémentation excessive d'un nombre finit par faire passer le bit de signe (le bit de poids le plus fort du nombre) à 1, ce qui le transforme soudain en nombre négatif. Ceci est d'autant plus intéressant que la fonction parseint retourne un entier non signé (qui compterait comme positif malgré le fait que son bit de poids le plus fort soit à 1), tandis que la variable dans laquelle est stockée ce résultat est un entier signé. Cela veut dire que nous pouvons passer un nombre positif comme entrée au programme, qui sera potentiellement interprété comme un nombre négatif plus tard ! C'est exactement ce que nous voulons.

Afin de trouver le nombre exact à passer au programme, nous pouvons faire cette manipulation dans python :

```py
>>> 0x100000000 - 0x133769
4293707927
```

Avec cette entrée, nous pouvons valider le challenge !

## **Flag : `MCTF{R4b0t41_s_N@m1:)}`**
