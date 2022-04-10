
# **T'es dans ta jalousie, je suis dans mon Jacque Houzit 3/3**.
## <u>**Catégorie**</u>

OSINT

## <u>**T'es dans ta jalousie, je suis dans mon Jacque Houzit 3/3**</u> :

```
L'agence Stranger Case vous demande maintenant de mettre fin à l'activité de Jacque Houzit en l'envoyant derrère les barreaux !
A partir des informations que vous avez réussi à récolter, trouvez une preuve factuelle que Jacque Houzit est bien à la tête d'un réseau de deal à grande échelle.

FORMAT DU FLAG : 
MCTF{}
```

## <u>Hints</u> 

Pas de hint

## <u>Difficulté</u> 

Hard

## <u>Auteur</u> 

Kazuno

## <u>Solution</u> :

Jusqu'ici, plusieurs informations différentes ont été récoltées lors de l'enquête.
Une des plus intéressantes  est la photo postée par le compte instagram trouvé lors du challenge 2/3 : gilleparballes

En effet la bio de la publication est assez explicite compte tenu du contexte : Back to business 🍁

Une première chose à faire est de localiser la photo. Pour ce faire, il est possible de localiser l'endroit de la photo en utilisant la recherche inversée de Google Image ou Yandex :
![img](geoint.png)

Il s'agit donc de Besse-et-Saint-Anastaise.

En SOCMINT, il existe différentes façons de pivoter autour d'une location : 
• Regarder les publications récentes autour de la ville
• Regarder les tweets publiés autour de cette localisation, etc...

Dans la description du premier challenge, on peut lire :
``
Il est notamment suspecté d'être à la tête d'un réseau de deal à grande échelle et d'utiliser différents réseaux sociaux pour en faire la promotion. 
``
Aujourd'hui, de nombreux dealers utilisent notamment le réseau social Snapchat pour faire la promotion de leurs produits.
Pour trouver le flag, il suffit d'utiliser la map snapchat : https://map.snapchat.com/, de se placer dans la ville localisée et de regarder les storys que l'on peut trouver autour de la ville.

Une fois cette manipulation faîte, on trouve rapidement la story faite par Jacques Houzit avec le flag.
(Je la posterai quelques heures avant le début du CTF pour qu'elle n'expire pas avant)


##**Flag : MCTF{M0d3rN_D34L_1s_N0w_0n_S0c14L_M4D14}**
