# **C'est carré**.
## <u>**Catégorie**</u>

CRYPTO

## <u>**Description**</u> :

```
LA DISPARITION

Un de vos collègue a disparu et vous fouillez dans ses affaires si vous ne pouvez pas trouvez un indice menant à son kidnappeur. Dans sa commode vous trouvez un drôle de papier avec une inscription étrange dessus. Vous êtes sur que la solution est écrit dessus.

FORMAT DU FLAG : MCTF{FLAG_EN_MAJUSCULES}
```

## <u>Hints</u> 

Vous apercevez une note griffonnée sur la marge : "J’aimɇ l’idɇɇ quɇ lɇ plus grand dɇs Sɇx-symbols nɇw-yorkais n’ɇtait qu’un chiɇn dans un foyɇr dɇ Brazzavillɇ"

## <u>Auteur</u> 

Moumou

## <u>Solution</u> :

C'est un carrée de polybe tous ce qui a de plus classique. 
En examinant le fichier on se rend compte qu'il y ceci à la fin : 14514553{151232771333772177251442237745457725}
Connaissant le format du flag MCTF{} on arrive déjà à :
    14 -> M
    51 -> C
    45 -> T
    53 -> F
Ensuite quand on regarde le texte on remarque ce : C 42 M M ainsi que 42 M M
On part donc sur:
    42 -> O

Suite à une analyse on peut voir ce schéma qui se répète : T 13 O 33
Ainsi on trouve :
    13 -> I
    33 -> N

Suite à cela on voit au tout début du texte : N I C O 15 12 25
Directement on peut penser à Nicolas
    15 -> L
    12 -> A
    25 -> S

On cherche ensuite des mots presque terminés en les complétant : I N 21 I C A T I O N , I N 55 A S I O N, O 24 24 O S I T I O N
    21 -> D
    55 -> V
    24 -> P

V O 23 L A I T
    23 -> U

Il ne reste plus grand-chose au flag : M C T F {L A 32 77 I N 77 D 77 S M O U 77 T T 77 S}
Ce qui nous donne
    77 -> E
    32 -> R

##**Flag : MCTF{LAREINEDESMOUETTES}**

