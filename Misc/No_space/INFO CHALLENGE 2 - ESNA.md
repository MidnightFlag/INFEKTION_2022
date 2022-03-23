# **NoSpace**.
## <u>**Catégorie**</u>

Misc

## <u>**Description**</u> :

```
Récupérer le flag contenu dans le fichier "The flag is here.txt"
 
```

## <u>Hints</u> 

Parfois une variable de shell peut aider

## <u>Auteur</u> 

Processus Thief

## <u>Solution</u> :

On peut utiliser la variable de shell ${IFS} pour écrire un espace sans caractère d'espacement.
On peut donc lire le fichier : cat${IFS}/root/*.txt

##**Flag : MCTF{sP4c3s_4r3_f0r_n3wb13s}**