# **Something_hidden**.
## <u>**Catégorie**</u>

Crypto

## <u>**Description**</u> :

```
DESCRIPTION DU CHALL

Un agent ennemi a été arrêté, nous avons trouvé un fichier étrange dans son téléphone. Nous sommes persuadés que ce fichier renferme un secret, trouvez-le !

FORMAT DU FLAG : MCTF{}
```

## <u>Hints</u> 
- No hint

## <u>Auteur</u> 

0xSysr3ll

## <u>Solution</u> :

Recette cyberchef :

```bash
$ xortool private.txt
The most probable key lengths:
   2:   7.3%
   4:   12.2%
   6:   6.9%
   8:   16.0%
  12:   8.8%
  16:   18.8%
  20:   6.1%
  24:   7.8%
  32:   10.0%
  48:   6.0%
Key-length can be 4*n
Most possible char is needed to guess the key!
$ xortool -l 16 -c ' ' private.txt
1 possible key(s) of length 16:
'+\x04Q\xbf\xbd1\x83a7J\x9f\xad1L\xc4\x8f'
Found 1 plaintexts with 95%+ valid characters
See files filename-key.csv, filename-char_used-perc_valid.csv
$ grep "MCTF" xortool_out/0.out
The message was MCTF{d0n7▒u53_sh0rt_x0r_kvys}
```

Juste un petit guess sur le flag : v=>e et le `_` qui n'est pas décodé correctement.
Clé xor originale : `4be220ecfa9fd46a84c5d6f2b8acb23c`

##**Flag : MCTF{d0n7_u53_sh0rt_x0r_k3ys}**