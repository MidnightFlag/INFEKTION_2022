Un fou a décidé de lancé son propre réseau social. Il est le seul à pouvoir se connecter. Il pense que sa clé secrète lui assure une sécurité optimale. Prouvez lui que vous pouvez vous connecter sur son comtpe.
(le flag est la clé de connexion)


Solution :
Une fois l'apk passé dans jadx, on voit que la clé est chiffrée grâce à plusieurs opérations faites à la suite.

Voici un exemple de script permettant de reverse le chiffrement

```py
tab = [35,117,51,75,57,49,117,201,83,127,257,17]
tab2 = []
for value in tab :
    tab2 += [(int)((value - 5) /2)]

xorKey = "IMTHEBOSS"

for i in range(len(tab2)) :
    print(chr(tab2[i] ^ ord(xorKey[i%len(xorKey)])))

```


Flag : MCTF{FuCk_Tw1tt3R}