# **Le jeton de Catwoman**.
## <u>**Catégorie**</u>

RESEAU

## <u>**Description**</u> :

```
Une authentification Kerberos a pu être capturée.
Vous devez retrouver le mot de passe de Catwoman.
Format : MCTF{password}
 
```

## <u>Hints</u> 

Les hints c'est pour les faibles.

## <u>Auteur</u> 

Processus Thief

## <u>Solution</u> :

On peut extraire le jeton TGT avec l’utilitaire Windows NetworkMiner.exe
Ensuite on lance un bruteforce pour retrouver le mot de passe de Catwoman avec John the Ripper.
Le format est krb5tgs et le mot de passe est dans rockyou.txt

##**Flag : ilovebatman**