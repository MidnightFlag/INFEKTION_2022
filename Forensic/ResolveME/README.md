# **ResolveME**.
## <u>**Catégorie**</u>

Forensic

## <u>**Description**</u> :

```
Notre NDR nous a remonté une alerte avec un tag  basé sur une tactique MITRE Attaack "Exfiltration". Par chance, j'ai réussi à dump la capture pcap depuis la console. 
Votre mission, si vous l'accepter est d'investiguer et de comprendre ce qui a bien pu se passer.

Format : MCTF{}
```

## <u>Hints</u> 

??? 
## <u>Auteur</u> 

N3oWind

## <u>Solution</u> :

Pour commencer, on ouvre la capture avec wireshark :

![alt](images/wireshark.png)

Ensuite afin d'avoir une vue d'ensemble, j'utilise la commande :

```bash
tshark -r chall.pcap -q -z io,phs
```

Cette commande nous donne plusieurs indications : 
- Les protocols présents dans cette capture 
- La taille des trames
- L'arborescence des couches de protcols.

![alt](images/1.png)

Dans les protocols interessants, on retrouve : 

- DNS
- ICMP/ICMPv6
- NTP
- HTTP
- ARP
- et potentiellement du HTTP avec une couche SSL (HTTPS)

On s'aperçoit que parmis les 12 trames HTTP, il y a 1 trame dans laquelle se trouve un champ "data", je décide donc de l'extraire :

Dans wireshark fichier > exporter objet > HTTP

![alt](images/objethttp.png)

On a notre première partie !!!
En regardant de plus pret, on reconnait l'encodage utiliser comme étant de la base64

On décide donc de passer le debut du fichier dans cyberchef afin qu'il puisse potentiellement détecter une en-tête. Bingo ! du JPG. On sait maintenant qu'on doit reconstruire une image.

Ensuite, on essaye de trouver les autres partie...

![alt](images/a-few-moments-later.gif)

On se rend compte qu'il y a de la base64 dans certaine requete DNS.
On essaye de les extraires grâce à Tshark en prenant soin de supprimer les doublons et de prendre uniquement la base64 qui se trouve à gauche du domain "midnightflag.fr".

```bash
tshark -2 -r chall.pcap -Y dns -R 'ip.src == 192.168.1.22 && dns.qry.name contains "midnightflag.fr"' -T fields -e dns.qry.name | sort -u | cut -d. -f1 > toto && python pythonsolve.py
```

```python
#! /usr/bin/env python3
#coding: utf-8

import base64
from encodings import utf_8

fichier = open("toto", "r")

lines = fichier.readlines()

for i in lines:
    code = base64.b64decode(i)
    print("Voici la partie", code.decode('utf_8'))
    #print(code)

fichier.close()          
```

**Résultat de la commande** :

![alt](images/python.png) 

Il faut maintenant reconstruire notre image en faisant attention de remettre les parties dans le bon ordre :

![alt](images/reconstruction.png)

Et enfin pour finir, il nous reste plus qu'à enlever les sauts à la ligne et décoder la base64 :

```bash
cat f1rst_p4rt | tr -d '\n' | base64 -d > flag
```
et obtient notre image avec notre flag !!

## **Flag : MCTF{K1ND_3XF1LTR4T1ON_B4S3D_ON_DNS_HTTP}**
