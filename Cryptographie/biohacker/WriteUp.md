# **BIOHACKER**
## Categorie

STEGANO

## Description

```
Les russes ont lancé un programme de développement d'armes biologiques. Vos compétences de (bio)hackeur sont requises pour trouver le nom de la protéine dont nous avons réussi à voler l'image !

Le flag est en majuscules, son format est : MCTF{NOM}
```

## Hints 

Souvenez vous de vos cours de nomenclature d'acides aminés.

## Auteur

SeulAParis

## Solution

Une protéine est faite d'une séquence d'acides aminés.

Chaque acide aminé est codifié par une lettre de l'alphabet, afin de pouvoir décrire de manière assez succincte la séquence d'une protéine.

Il suffit de trouver une table qui fasse la correspondance entre la formule d'un acide aminé et sa lettre pour traduire le flag.

Deux informations complémentaires sont que dans une protéine les acides aminés sont liés par réaction entre le groupe A-CO-OH de l'un et le groupe B-NH2 de l'autre : le résultat est un A-CO-NH-B qui fait le pont entre les acides aminés A et B.

On dit que le début d'une protéine se trouve au niveau de l'endroit où le groupe NH2 est resté libre (sa fin est donc au niveau du groupe COOH libre).

Sachant cela, on peut commencer à décoder la séquence : le premier acide aminé (avec un soufre SH) est une cystéine (C), le deuxième une histidine (H), ...

## Flag : `MCTF{CHEMISTRYNERD}`
