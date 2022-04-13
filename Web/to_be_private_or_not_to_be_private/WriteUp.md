# **To be private or not to be private ?**.
## <u>**Catégorie**</u>

CATEGORIE : Web

## <u>**Description**</u> :


DESCRIPTION DU CHALL

Au sein de vos locaux un employé vous semble suspicieux et pourrait envoyé des informations importante à une organisation, vous savez qu'il utilise souvent un cloud est ce que tout cela est lié ?

FORMAT DU FLAG : MCTF{flag}


## <u>Hints</u> 

aucun HINTS pour l'instant

## <u>Auteur</u> 

Spownark 

## <u>Solution</u> :
En arrivant sur le site on peut voir qu'il s'agit d'un cloud réaliser par une personne, en regardant le code source du site on peut voir que la personne a laissé un commentaire sur ça barre de navigation étant fier de ce qu'il à fait.

![](./photos_WU/cloud_1.png)

Lorsque l'on clique sur l'un des 2 boutons sur la barre de navigation (Photo et Music) on voit dans l'URL qu'un paramètre nommais "categorie" est affiché et que celui-ci prend en valeur les page pour les afficher.

![](./photos_WU/cloud_2.png)

En voyant le nom du chall la personne va essayer de mettre (cloud/?categorie=private.php) ce qui va lui retourner cette page :

![](./photos_WU/cloud_3.png)

Cette page n'est pas la que pour troller le joueur car si elle va dans le code source elle pourra voir ce commentaire.

![](./photos_WU/cloud_4.png)

en effet il y a bien un message laissé par inadvertance "don't leak (\x70\x65\x72\x73\x6F\x6E\x61\x6C)" celui ci est chiffré en hexa il suffit d'aller sur dcode pour le déchiffrer et on obtient "personal" il suffit de mettre dans l'URL (cloud/?categorie=personal.php) ce qui nous affiche cette page.

![](./photos_WU/cloud_5.png)

On obtient un fichier audio qui est téléchargable en l'écoutant le son parait étrange il suffit de l'ouvrir dans audacity pui d'activer le spectogramme et de mettre dans le bon sens la piste et on obtient le flag :

![](./photos_WU/cloud_6.png)

##**Flag : MCTF{@_5pY_N0t_W3Ll_1D3n}**