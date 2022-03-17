# Catégorie
 - OSINT 
 - Niveau: Facile

# Scénario
Nos services de renseignements viennent de recevoir un message d'un de nos agents en URSS et selon les premiers éléments nous devons rapidement le retrouver pour l'exfiltrer.
Votre mission est de décoder son message et de nous renvoyer le lieu d'extration le formulaire habituel (MCTF{hashMD5()})

# Instructions

 - Ajouter l'extension .png au fichier reçu. (MessageRecover)

 ![Indice1](/Grande_Roue_Pripyat.png "Grand Roue Pripyat")

 - Passer l'image à la moulinette pour obtenir dans les métas données le message suivant: WzUxLjQwMzA5LCAzMC4wNDQwMXw1MS40MDc4OSwgMzAuMDU1NjR8NTEuNDAwODksIDMwLjA2NDA4XSwgSSB3SUxsIHdBSXQgWW9VIGFUIHRIZSBjRW50RVIu

 - Une fois déchiffrer (Base64), on a: [51.40309, 30.04401|51.40789, 30.05564|51.40089, 30.06408], I wILl wAIt YoU aT tHe cEntER.

 - Avec l'aide de Google Maps, on trouve les 3 coordonnées GPS.

 - Toujours grâce à Google, on utilise le site suivant: https://support.google.com/mymaps/answer/3024454?hl=en&amp%3Bref_topic=3188329

 - Pour créer un triangle ayant pour sommet les 3 points précédents. En cherchant dans la zone dessiné par le triangle, on trouve un seul point d'intéret qui semble correspondre à notre image du début (Чорнобиль). Seul point d'intérêt dans la zone délimitée.

 ![Indice2](/pripyat_maps.png "Triangulation Maps")

 - Dnas notre triangle, on trouve un seul point d'intérêt (Чорнобиль), la grande roue est la même que sur l'image que l'on a au début du chall.

 - soit en MD5: 3687016d7a89edc046069933f208e8c8

 - Donc comme réponse, on attend: MCTF{3687016d7a89edc046069933f208e8c8}
