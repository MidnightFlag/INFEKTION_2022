# **Infiltration au KGB 4/4**
## <u>**Catégorie**</u>

Misc / Medium

## <u>**Description**</u> :

Bien joué vous avez le lieu de la réunion, mais vous n'avez toujours pas contacté l'agent 576...  
N'oubliez pas de lui donner le lieu de la réunion pour prouver que vous êtes digne de confiance.  

Salt : “Russia”  
IV : 0101010100000111101110111010011101110111010110101111001011110001  

Format : MCTF{Nom du lieu en Anglais} (remplacer les espaces par un '-')

## <u>**Hints**</u> :

x

## <u>**Auteur**</u> :

Lyior / CrZ

## <u>Solution</u> :

On découvre le nouveau channel “message”  

Une chaîne chiffrée est présente dans un fichier texte  

Après recherche et en regardant le message en dessous du fichier on trouve que le chiffrement à cette époque est le GOST  

Après quelque recherche cette bibliothèque semble faire l’affaire https://github.com/sghebrab/GOST-cipher  

Le déchiffrement nous donne :  010011010100001101010100010001100111101101001110001100000101111101000110001100110110000101110010010111110011010001011111010001110011000001110011010101000111110100000000000000000000000000000000

Il ne reste plus qu'à convertir en ASCII  

**Flag : MCTF{N0_F3ar_4_G0sT}**