# Catégorie
 - Stéganographie 
 - Niveau: Facile/Moyen

# Scénario
Un de nos agents originaires de Manchester et infiltrer en Ukraine vient de nous envoyer un message, malheuresement nos opérateurs n'arrivent pas à le déchiffrer.
Votre mission sera de le décoder et de récupérer le message (MCTF{message}

# Instructions

 - Fichier .wav à ouvrir avec Audacity
 
 - ![Indice1](/contenu01.png "Contenu audio")

 - Les données que nous cherchons sont en binaires et se trouve répété 3 fois lors de 5,6ms. Le reste n'est que du bruit issu de Duga-1 (https://fr.wikipedia.org/wiki/Pic-vert_russe).

 - Il s'agit du même message répété en boucle pendant 5,6 ms

 - Il peut être récupéré via un script python maison ou à la main. 

 - Si vous le faites à la main, 0 (point les plus bas) & 1 (point les plus haut).

 - On trouve le binaire suivant:
    011001011010011001100101010110100110011001100101011001010110100101101010100110100110011001100101011010011001010101011010010110100110011010101010011010010110101001100110010110010110100101100110011001010110011001100101101010010110011010101010011010100110101001011010010101010110010110101010011010010110010101100110010101010101101001011010011010010101101001101001100110100110100101100110011001100101100101100110101010100110100110010101010110100101101001011010011001010110101001011001011001100101101001100110101010100110101010010110010110100101010101101010011001100110101010100110
 
 - Si on essaye de le passer en texte, on trouvera : e¦eZfeeij.fei.ZZfªijfYifefe©fªjjZUeªiefUZZiZi.iffYfªi.ZZZejYfZfªj.ZUjfj¦

 - Pour obtenir le message en clair, on utilise le code Manchester (https://www.dcode.fr/code-manchester). 
 Ainsi, on obtient le binaire suivant:
    010011010100001101010100010001100111101101010100011010000011001101011111011001110101001001100101010001010100111001011111011101110011000001001111011001000101000000110011011000110110101101100101010100100101111101101000001100110011010001110010010100110101111101111001001100000111010101111101

 - Avec l'outil CyberChef (https://gchq.github.io/CyberChef/#recipe=From_Binary('Space',8)&input=MDEwMDExMDEwMTAwMDAxMTAxMDEwMTAwMDEwMDAxMTAwMTExMTAxMTAxMDEwMTAwMDExMDEwMDAwMDExMDAxMTAxMDExMTExMDExMDAxMTEwMTAxMDAxMDAxMTAwMTAxMDEwMDAxMDEwMTAwMTExMDAxMDExMTExMDExMTAxMTEwMDExMDAwMDAxMDAxMTExMDExMDAxMDAwMTAxMDAwMDAwMTEwMDExMDExMDAwMTEwMTEwMTAxMTAxMTAwMTAxMDEwMTAwMTAwMTAxMTExMTAxMTAxMDAwMDAxMTAwMTEwMDExMDEwMDAxMTEwMDEwMDEwMTAwMTEwMTAxMTExMTAxMTExMDAxMDAxMTAwMDAwMTExMDEwMTAxMTExMTAx), on decode notre binaire en texte et on trouve:  
 MCTF{Th3_gReEN_w0OdP3ckeR_h34rS_y0u}