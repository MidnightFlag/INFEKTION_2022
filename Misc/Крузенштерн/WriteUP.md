# **Крузенштерн**.
## <u>**Catégorie**</u>

MISC

## <u>**Description**</u> :

```
Le Крузенштерн a récement révélé un secret !
Nous ne comprennons pas ses déplacements, aidez-nous.

FORMAT DU FLAG : MCTF{FLAG}
```

## <u>Hints</u> 

HINTS

## <u>Auteur</u> 

Morpheus

## <u>Solution</u> :

Il faut comprendre que c'est des message AIS grâce à une recherche google : https://www.google.com/search?q=message+AIVDM
Ensuite, il faut trouver un decodeur AIS de type : https://www.maritec.co.za/aisvdmvdodecoding
Ensuite, le but est de récupérer toutes les coordonnées GPS et créer un kml : https://developers.google.com/kml/documentation/kml_tut
puis l'afficher ici : https://kmlviewer.nsspot.net/

##**Flag : MCTF{AIS_SECRET_MESS}**