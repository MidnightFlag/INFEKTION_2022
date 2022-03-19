Auteur : ZarKyo

Catégorie : Cryptographie

---

# Tout droit vers le point

## Ennoncé

Un espion americain infiltré en Russie vous a contacté en morse pour vous transmettre 2 messages. A vous des les déchiffrer.
Auparavant il vous a transmis une suite de charactère incompréhensible et une grille mais incomplète, à quoi peut-elle bien servir ?

- Message chiffré : GGGGXGVGAFFAFFDDDDFDFAAGVGDAVDFXDXADVXFDVVFDFFVDGGGGFVAAAFDGAAGFFFFAFAAXVGAVVVDDXDXGAVFDAAADGVGXAVXGAAXFGVGVVDVAXFXVAVAAFXVVXX
- Grille incomplète : L5BWRD.C7UAFH3.XE6O2S.1VIN4G0.TQ9Z8.
- 2 audios

## Solve

Tout d'abord, on commence par faire des recherches pour attribuer le message chiffré à une méthode de chiffrement particulière. L'utilisation exclusives des lettres ADFGVX nous mène au **Chiffre ADFGVX**. En lisant de la documentation, on s'aperçoit que c'est un algorithme qui associe une **substitution** insipiré du **carré de Polybe** et d'une **transposition**.

Pour déchiffrer le message, il faut donc une grille et une clé.

### Fichier audio

En écoutant les fichiers, on comprend vite que le langage utilisé est le morse. Cependant ce n'est pas le morse international. Ici, c'est espion américain qui transmet le message, on a donc affaire avec du morse **américain**.

Pour décoder le morse, 2 techniques sont possibles : 

- écouter le morse, traduire en point et en trait puis traduire en lettre à l'aide de documentation

- mettre le fichier audio dans audacity et mettre en spectogramme la piste, traduire en point et en trait puis traduire en lettre à l'aide de documentation

#### Audio 1 - La clé

`.. .   ⸺   . / .-.   . ..   -.-   ..-   .. .   . .` = CLE FRKUCO

On comprend que cet audio sert à nous donner la clé.

#### Audio 2 - Compléter la grille

Après avoir décodé le premier audio, on en déduit que celui-ci sert à compléter la grille.

`..... -- -.- .. .. -.-.` = P M K Y J

On remplace les points par les lettres dans l'ordre.

GRILLE incomplete : L5BWRD.C7UAFH3.XE6O2S.1VIN4G0.TQ9Z8.

GRILLE complete : L5BWRDPC7UAFH3MXE6O2SK1VIN4G0YTQ9Z8J

### Déchiffrement

Maintenant que notre grille est complète et qu'on possède la clé. On peut soit faire un programme pour déchiffrer le message ou aller directement sur un outil online.

https://www.dcode.fr/chiffre-adfgvx

On obtient : `LESRUSSESNESONTPASLOINVOUSDEVEZEXFILTRERLEFLAGMCTFCH1FFR34DFGVX`

Message déchiffré : les russes ne sont pas loin, vous devez exfiltrer le flag MCTFch1ffr34dfgvx

**Flag : ch1ffr3_4dfgvx**
