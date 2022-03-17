# **Rocket launch validator**

## **Catégorie**

Reverse

## **Description**

```
Voici le programme qui gère les lancements de fusées russes. Trouvez le code de validation qui permet d'autoriser un lancement pour obtenir le flag !
```

## **Hints**

Non.

## Auteur

SeulAParis

## Solution

C'est très simple, on ouvre le truc dans cutter, on utilise le décompilateur sur la fonction `sym.decode_flag`, et on regarde ce que ça donne :

```
undefined8 decode_flag(int64_t arg1, char *arg2) {
    int64_t iVar1;
    undefined8 uVar2;
    char *s;
    int64_t var_8h;
    
    iVar1 = strlen(arg2);
    if (iVar1 == 10) {
        if (*arg2 == 'C') {
            *(undefined2 *)arg1 = 0x434d;
            *(undefined *)(arg1 + 2) = 0;
            if (arg2[1] == '2') {
                *(undefined4 *)(arg1 + 2) = 0x7b4654;
                if (arg2[2] == 'I') {
                    *(undefined2 *)(arg1 + 5) = 0x7254;
                    *(undefined *)(arg1 + 7) = 0;
                    if (arg2[3] == 'Y') {
                        *(undefined2 *)(arg1 + 7) = 0x7634;
                        *(undefined *)(arg1 + 9) = 0;
                        if (arg2[4] == '3') {
                            *(undefined2 *)(arg1 + 9) = 0x5f61;
                            *(undefined *)(arg1 + 0xb) = 0;
                            if (arg2[5] == 'X') {
                                *(undefined2 *)(arg1 + 0xb) = 0x5f55;
                                *(undefined *)(arg1 + 0xd) = 0;
                                if (arg2[6] == 'P') {
                                    *(undefined2 *)(arg1 + 0xd) = 0x3044;
                                    *(undefined *)(arg1 + 0xf) = 0;
                                    if (arg2[7] == 'Z') {
                                        *(undefined2 *)(arg1 + 0xf) = 0x416d;
                                        *(undefined *)(arg1 + 0x11) = 0;
                                        if (arg2[8] == '9') {
                                            *(undefined2 *)(arg1 + 0x11) = 0x2121;
                                            *(undefined *)(arg1 + 0x13) = 0;
                                            if (arg2[9] == 'A') {
                                                *(undefined2 *)(arg1 + 0x13) = 0x7d;
                                                uVar2 = 0;
                                            } else {
                                                uVar2 = 1;
                                            }
                                        } else {
                                            *(undefined2 *)(arg1 + 0x11) = 0x2e2e;
                                            *(undefined *)(arg1 + 0x13) = 0;
                                            uVar2 = 1;
                                        }
                                    } else {
                                        *(undefined2 *)(arg1 + 0xf) = 0x2e67;
                                        *(undefined *)(arg1 + 0x11) = 0;
                                        uVar2 = 1;
                                    }
                                } else {
                                    *(undefined2 *)(arg1 + 0xd) = 0x6e31;
                                    *(undefined *)(arg1 + 0xf) = 0;
                                    uVar2 = 1;
                                }
                            } else {
                                *(undefined2 *)(arg1 + 0xb) = 0x5272;
                                *(undefined *)(arg1 + 0xd) = 0;
                                uVar2 = 1;
                            }
                        } else {
                            *(undefined2 *)(arg1 + 9) = 0x6548;
                            *(undefined *)(arg1 + 0xb) = 0;
                            uVar2 = 1;
                        }
                    } else {
                        *(undefined2 *)(arg1 + 7) = 0x5f64;
                        *(undefined *)(arg1 + 9) = 0;
                        uVar2 = 1;
                    }
                } else {
                    *(undefined2 *)(arg1 + 5) = 0x3352;
                    *(undefined *)(arg1 + 7) = 0;
                    uVar2 = 1;
                }
            } else {
                uVar2 = 1;
            }
        } else {
            uVar2 = 1;
        }
    } else {
        uVar2 = 1;
    }
    return uVar2;
}
```

Si on isole les lignes qui font référence à arg2, on a ça :

```
undefined8 decode_flag(int64_t arg1, char *arg2) {
    iVar1 = strlen(arg2);
    if (*arg2 == 'C') {
    if (arg2[1] == '2') {
    if (arg2[2] == 'I') {
    if (arg2[3] == 'Y') {
    if (arg2[4] == '3') {
    if (arg2[5] == 'X') {
    if (arg2[6] == 'P') {
    if (arg2[7] == 'Z') {
    if (arg2[8] == '9') {
    if (arg2[9] == 'A') {
```

On a donc devant nous la clé de validation, qui est suffisante pour résoudre le chall.

```
$ ./rocket_launch_validator C2IY3XPZ9A
You have flag! Here it is:
MCTF{Tr4va_U_D0mA!!}
```

## **Flag: `MCTF{Tr4va_U_D0mA!!}`**
