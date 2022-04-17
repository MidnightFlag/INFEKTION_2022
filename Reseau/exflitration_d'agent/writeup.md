# ** Exfiltration d'agent **
## <u>**Catégorie**</u>

Réseau/Forensics

## <u>**Description**</u> :

```
DESCRIPTION DU CHALL

Un agent à raté son exfiltration, il nous a cependant transmit un message de haute importance, trouvez-le !

Format : MCTF{}
```

## <u>Hints</u>


## <u>Auteur</u>

0xSysr3ll

## <u>Solution</u> :

Après une petite analyse de la capture réseau, on remarque la mention de `flag.txt` dans le champs data d'une trame ICMP reply.

```bash
└─[0] <> tshark -r transmission.pcapng -Y icmp -T fields -e data | grep "[a-zA-Z0-9]" | xxd -r -p | strings
flag.txt
flag.txt
flag.txt
flag.txt
icmp exfil has completedicmp exfil has completed
```

En effet, il est tout à fait possible de faire passer la donnée que l'on souhaite via ce champs.
Si on extrait le code hexa qui fait référence à ce flag et qu'on le decode pour le mettre dans un fichier :

```
└─[0] <> echo -n "504b0304140301000000dd917854acfb357c280000001c00000008000000666c61672e747874895bb9c64f274c8f2e3c66bc11016dd0ff3c370c9feaa727ddddf0703da9ec2ac11d29321a21be15504b01023f03140301000000dd917854acfb357c280000001c000000080024000000000000002080ed8100000000666c61672e7478740a002000000000000100180080fe8dafa23fd801007f5079a23fd80180fe8dafa23fd801504b050600000000010001005a0000004e0000000000" | xxd -p -r > recovered
┌─[sysr3ll@pentest-lab] - [~/Documents/CTFs/INFEKTION/ICMP_exfiltration] - [2022-03-24 08:06:56]
└─[0] <> file recovered 
recovered: Zip archive data, at least v2.0 to extract, compression method=store
```

On obtient une archive zip.
```bash
└─[0] <> unzip archive.zip 
Archive:  archive.zip
[archive.zip] flag.txt password:
```
Evidemment, cette archive est protégée par un mot de passe.

```bash
└─[0] <> zip2john archive.zip > zip.hash
ver 78.8 archive.zip/flag.txt PKZIP Encr: cmplen=40, decmplen=28, crc=7C35FBAC
└─[0] <> john --format=PKZIP zip.hash --wordlist=/usr/share/wordlists/rockyou.txt 
Using default input encoding: UTF-8
Loaded 1 password hash (PKZIP [32/64])
Will run 8 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
G3ars0fwar       (archive.zip/flag.txt)
1g 0:00:00:01 DONE (2022-03-24 20:17) 0.8064g/s 9011Kp/s 9011Kc/s 9011KC/s GAJEBO..FUCKUALICE
Use the "--show" option to display all of the cracked passwords reliably
Session completed

└─[0] <> unzip archive.zip 
Archive:  archive.zip
[archive.zip] flag.txt password: 
replace flag.txt? [y]es, [n]o, [A]ll, [N]one, [r]ename: y
 extracting: flag.txt                
```

**Flag : MCTF{g00d_0ld_1cmp_pr070c0l}**