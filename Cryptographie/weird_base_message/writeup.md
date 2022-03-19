# **Weird base message**.
## <u>**Catégorie**</u>

Crypto

## <u>**Description**</u> :

```
DESCRIPTION DU CHALL

Pendant la guerre froide, un agent du KGB a inventé une nouvelle méthode pour transmettre des messages "chiffrés" à ses interlocuteurs.

Vous avez réussi à mettre la main sur un des message envoyés.
Retrouvez le message original.

FORMAT DU FLAG : MCTF{}
```

## <u>Hints</u> 


## <u>Auteur</u> 

0xSysr3ll

## <u>Solution</u> :

Recette cyberchef :

From base64 > From base32 > From base85 > From base58 > Zlib inflate > From hex

**Flag : MCTF{3nc0d1n6_15_n0_cryp70}**