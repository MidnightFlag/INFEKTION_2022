## unfinished intranet
```
Points : ???

Author : .Yo0x

Description : Des hackers de l'URSS ont réussi à lire le code source de l'intranet en construction d'une agence gouvernementale des Etats-unis. 

Cette agence vous à demandé de leur faire un rapport sur la faille qui rendu possible cette action.

le flag est sous la forme MCTF{}

```

Nous n'avons pas beaucoup de possibilité avec cette application, seul la création de compte est possible mais pas terminé.

De plus la création de compte semble vulnérable. 

après la création du compte on est rediriger vers un endpoint nous informant de l'indisponibilité du site 

![Pasted image 20220404231904.png]

Pour y voir plus claire, il est nécessaire de capturer la requête.

![[Pasted image 20220404190139.png]]

Après capture de la requête nous pouvons observer que les données sont passé au format xml.

Cependant aucune information n'est retourné.

si on tente une deuxième fois, un message d'erreur apparaît en nous infomant que l'adresse mail existe déjà.

tentons alors une XXE : 


![[Pasted image 20220404193354.png]]

![[Pasted image 20220404193405.png]]

Nous avons récupéré le code source de l'application.

il nous reste plus qu'a décodé le code source 

```bash
 echo -n PD9waHANCiNUaGUgZmxhZyBpcyBNQ1RGezM0c3lfWFhFXzFudDBkdWN0MTBufQ0KbGlieG1sX2Rpc2FibGVfZW50aXR5X2xvYWRlciAoZmFsc2UpOw0KJHhtbGZpbGUgPSBmaWxlX2dldF9jb250ZW50cygncGhwOi8vaW5wdXQnKTsNCiRkb20gPSBuZXcgRE9NRG9jdW1lbnQoKTsNCiRkb20tPmxvYWRYTUwoJHhtbGZpbGUsIExJQlhNTF9OT0VOVCB8IExJQlhNTF9EVERMT0FEKTsNCiRpbmZvID0gc2ltcGxleG1sX2ltcG9ydF9kb20oJGRvbSk7DQokbmFtZSA9ICRpbmZvLT5uYW1lOw0KJHRlbCA9ICRpbmZvLT50ZWw7DQokZW1haWwgPSAkaW5mby0+ZW1haWw7DQokcGFzc3dvcmQgPSAkaW5mby0+cGFzc3dvcmQ7DQoNCmVjaG8gIlNvcnJ5LCAkZW1haWwgaXMgYWxyZWFkeSByZWdpc3RlcmVkISI7DQo/Pg== | base64 -d
<?php
#The flag is MCTF{34sy_XXE_1nt0duct10n}
libxml_disable_entity_loader (false);
$xmlfile = file_get_contents('php://input');
$dom = new DOMDocument();
$dom->loadXML($xmlfile, LIBXML_NOENT | LIBXML_DTDLOAD);
$info = simplexml_import_dom($dom);
$name = $info->name;
$tel = $info->tel;
$email = $info->email;
$password = $info->password;

echo "Sorry, $email is already registered!";

```

On peut maintenant voir le flag dans les commentaires.
