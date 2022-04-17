# **Dizzy Dev**.

## <u>**Catégorie**</u>

Forensic

## <u>**Description**</u> :

```txt

Une entreprise vient de détecter une activité anormale sur son compte AWS.
Elle suspecte un leak des informations d'identification (CLI).
À vous de retrouver comment récupérer ces informations.

FORMAT DU FLAG : MCTF{...}
```

## <u>Hints</u>

1 Insecure commit

2 Check .env

## <u>Auteur</u>

Alpine

## <u>Solution</u> :

Après un peu de reconnaissance avec [gobuster](https://github.com/OJ/gobuster) par exemple, on retrouve facilement un dossier .git exposé.

On utilise un outil du type [git-dumper](https://github.com/arthaud/git-dumper) pour récupérer le repo git.

Une fois dans le dump, on a accède à la liste des commits avec `git log`.

On voit que le message du commit HEAD est le suivant : "remove.env"

On `git checkout` pour accéder au commit précédent et ainsi récupérer le .env qui contient les informations d'identification recherchées.

## **Flag : MCTF{wJalrXUtnFEMO/K7MDENG/bPxRfiCYEXAMPLEKEY}**
