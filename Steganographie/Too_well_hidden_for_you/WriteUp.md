# **Too well hidden for you**.
## <u>**Catégorie**</u>

Steganographie / Médium

## <u>**Description**</u> :

Un de nos agents a réussi à intercepter un mail suspecté d'être envoyé par l'ennemi contenant plusieurs fichiers. Il n'a vraisemblablement pas trouvé d'information confidentielle à l'oeil nues... Vos supérieurs sont pourtant certains qu'ils contiennent un message secret. 
Menez votre enquête pour rendre compte à vos supérieurs. Faites attention, certains documents sont peut-être présents pour brouiller les pistes...

Format : MCTF{PartiesDuFlagConcaténées}

## <u>Hints</u> 

- Indice 1 : Une librairie python connu permet de cacher du texte...
- Indice 2 : Un outil en rapport avec la neige pourrait peut-être vous aider...

## <u>Auteur</u> 

Arathor

## <u>Solution</u> :

On constate que le zip contient 3 images et un fichier texte, il faut retrouver les 3 parties du flag pour l'obtenir. D'après ce qui nous a été dit dans la description tous les documents ne nous serviront pas. 


![](./chall/1.png)  
Document 1 :  
Le 1.png apparaît comme corrompu, il faut se diriger dans le code source de l'image et à l'aide de ctrl+f chercher MCTF pour trouver la première partie du flag


Document 2 ::
 ![](./chall/2.png)!  
Solution 1 : installer le paquet stegano puis utiliser l'argument reveal qui sert à révéler les messages potentiellement caché couplé à l'option -i permettant d'indiquer le chemin vers l'image à traiter.

    stegano-lsb reveal -i "Chemin_vers_l'image"

Solution 2 : utiliser stegano comme librairie python dans un script :

    from stegano import lsb
    print(lsb.reveal("Chemin_vers_l'image"))

Vous avez maintenant la 2 ème partie du flag


Document 3 :  
 ![](./chall/3.png)  
il n'y a rien ici 

Document neige.txt :  
Ici, il s'agit d'un texte caché dans du texte qui est invisible à l'oeil nu. Il faut utiliser la programme en ligne de commande Stegsnow pour le voir.
L'option -C de stegsnow permet de compresser/décompresser le message caché lors de l'encodage ou du décodage. 

    stegsnow -C discours.txt

Vous avez la 3 ème partie du flag.

**Flag : MCTF{St3g4n0grAphY_iS_r34LlY_Us3fUL}**
