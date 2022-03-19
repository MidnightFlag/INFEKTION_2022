# **Challenge de recrutement**
## **Catégorie**

Reverse

## **Description**

```
En faisant de l'urbex avec un de vos amis soviétiques dans un bâtiment abandonné en Russie, vous avez trouvé une vieille clé USB avec ce qui ressemble fortement à un vieux challenge de recrutement du KGB dessus.
```

## Auteur

SeulAParis

## Solution

Nous sommes face à un challenge de reverse windows. Vu que c'est du windows, on peut se servir d'IDA pour l'analyse, qui a tendance à bien macher le travail pour nous. Avec la vue graphe, on explore start et ses sous-fonctions jusqu'à trouver le main, qui se trouve à l'adresse 0x401550. 

Le premier bloc du graphe ne nous intéresse pas vraiment, il se contente de faire de l'initialisation et d'afficher le message de bienvenue. On y note toutefois l'initialisation d'une variable (`var_10`) à une valeur encodée en 0x404000. Avec un peu d'intuition on se doute que c'est le flag.

Ensuite l'entrée utilisateur est prise et sa longueur est comparée à 24. Si la longueur est différente de cette valeur, le programme quitte.

Ensuite, une boucle itère sur chaque caractère de l'entrée, et le compare à un caractère du flag encodé xoré avec 0x42. Si une différence est relevée, le programme quitte immédiatement. Sinon, la boucle se termine et le message de succès s'affiche.

On peut atteindre le même résultat en ouvrant le programme dans le décompilateur ghidra de cutter. Le code une fois nettoyé ressemble à ça :

```c
undefined8 fcn.00401550(int64_t arg1, int64_t arg2) {
    fcn.00401710(); // useless??

    s[50] = {'\0'};
    var_10h = 0x404000;
    sub.msvcrt.dll_puts("Hello. Please find me input that is flag.");
    sub.msvcrt.dll_scanf("%48s", &s);
    if(sub.msvcrt.dll_strlen(&s) == 0x18) {
        for(i = 0 ; i < 0x18 ; i++) {
            if((var_10h[i] ^ 0x42) != s[i]) {
                sub.msvcrt.dll_puts("Wrong. You not have flag.");
                return 1;
            }
        }
        sub.msvcrt.dll_printf("Congratulations. Bravo. You have flag. Here:\n%s\n", &s);
        return 0;
    } else {
        sub.msvcrt.dll_puts("No. This is not flag.");
        return 1;
    }
}
```

Ces deux méthodes d'analyse nous mènent au même point : la récupération de 24 octets à l'adresse 0x404000, qui est celle dont les caractères sont xorés avec 0x42 pour être comparés à l'entrée utilisateur.

Voici l'hexadécimal de la chaine de caractères en question : `0f011604390c76360a760c1d73111d162a711d007177363f`.

On peut donc retrouver le flag grâce à la manipulation suivante en python :

```py
>>> import pwn
>>> pwn.xor(bytes.fromhex("0f011604390c76360a760c1d73111d162a711d007177363f"), 0x42)
b'MCTF{N4tH4N_1S_Th3_B35t}'
```

## **Flag : `MCTF{N4tH4N_1S_Th3_B35t}`**
