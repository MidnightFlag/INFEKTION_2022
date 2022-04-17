# **BIOHACKER**
## Categorie

STEGANO

## Description

```
Les russes ont lanc� un programme de d�veloppement d'armes biologiques. Vos comp�tences de (bio)hackeur sont requises pour trouver le nom de la prot�ine dont nous avons r�ussi � voler l'image !

Le flag est en majuscules, son format est : MCTF{NOM}
```

## Hints 

Souvenez vous de vos cours de nomenclature d'acides amin�s.

## Auteur

SeulAParis

## Solution

Une prot�ine est faite d'une s�quence d'acides amin�s.

Chaque acide amin� est codifi� par une lettre de l'alphabet, afin de pouvoir d�crire de mani�re assez succinte la s�quence d'une prot�ine.

Il suffit de trouver une table qui fasse la correspondance entre la formule d'un acide amin� et sa lettre pour traduire le flag.

Deux informations compl�mentaires sont que dans une prot�ine les acides amin�s sont li�s par r�action entre le groupe A-CO-OH de l'un et le groupe B-NH2 de l'autre : le r�sultat est un A-CO-NH-B qui fait le pont entre les acides amin�s A et B.

On dit que le d�but d'une prot�ine se trouve au niveau de l'endroit o� le groupe NH2 est rest� libre (sa fin est donc au niveau du groupe COOH libre).

Sachant cela, on peut commencer � d�coder la s�quence : le premier acide amin� (avec un soufre SH) est une cyst�ine (C), le deuxi�me une histidine (H), ...

## Flag : `MCTF{CHEMISTRYNERD}`