# Doubtful Cipher
## <u>**CatÃ©gorie**</u>

PWN

## <u>**Description**</u> :

This toxic guy provides a secret generator from plaintext which is not supposed to store the secrets you send to it...
He even gives the source code... In which we can clearly see that he in fact logs the secrets !

Try to get back his own secret so he can learn a thing or two about privacy :p

FORMAT DU FLAG : Flag donné par le process qui tourne en remote, MCTF{...}

ACCES AU CHALLENGE :

Code source fourni + accès remote

## <u>Hints</u> 

My cipher is super strong, XOR is such a good cryptographic opeartion

## <u>Auteur</u> 

Noiche

## <u>Solution</u> :

Il y a un overflow via le read `BLOCK_SIZE*2`, on peut donc réécrire la clé XOR servant à chiffrer le flag. Il suffit donc de réécrire cette clé avec des zéros pour rendre le XOR inutile et ainsi obtenir le flag en clair lors de l'affichage du flag xoré par zéro.

Exemple :

```bash
python3 -c "print('A'*32 + '\x00'*32 + '\nmsg')" | ./DoubtfulCipher
```

##**Flag : MCTF{This_One_Was_Easy_Dude}**
