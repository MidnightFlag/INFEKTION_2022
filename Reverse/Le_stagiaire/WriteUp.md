# **Le stagiaire**
## **Catégorie**

Reverse

## **Description**

```
Notre stagiaire a écrit un programme mais il a oublié son mot de passe. Aidez donc se pauvre enfant.

```

## Hints


## Auteur

ToRr0aN

## Solution


On cherche d'abord la version de python compatible. Le magic number vaut 0x0d6f soit 3439. On voit que 3439 correspond à python 3.10b1. (https://github.com/google/pytype/blob/main/pytype/pyc/magic.py)  
Malheuresement, aucun décompilo n'est disponible pour cette version. On va donc devoir s'afférer à la lecture du bytecode.  

Pour obtenir un bytecode potable, on peut trouver ce projet sur git : https://github.com/gmodena/pycdump/blob/master/dump.py

On a donc :

```


  2           0 LOAD_CONST               1 ('')
              2 STORE_FAST               1 (bad_string)

  3           4 LOAD_FAST                0 (string)
              6 GET_ITER
        >>    8 FOR_ITER                 8 (to 26)
             10 STORE_FAST               2 (letter)

  4          12 LOAD_FAST                1 (bad_string)
             14 LOAD_FAST                2 (letter)
             16 LOAD_CONST               2 (4)
             18 BINARY_LSHIFT
             20 INPLACE_ADD
             22 STORE_FAST               1 (bad_string)
             24 JUMP_ABSOLUTE            4 (to 8)

  5     >>   26 LOAD_GLOBAL              0 (looser)
             28 CALL_FUNCTION            0
             30 POP_TOP

  6          32 LOAD_GLOBAL              1 (exit)
             34 LOAD_CONST               3 (0)
             36 CALL_FUNCTION            1
             38 POP_TOP
             40 LOAD_CONST               0 (None)
             42 RETURN_VALUE
  1           0 LOAD_CONST               0 (<code object useless_encrypt at 0x7f9d2a4419a0, file "test.py", line 1>)
              2 LOAD_CONST               1 ('useless_encrypt')
              4 MAKE_FUNCTION            0
              6 STORE_NAME               0 (useless_encrypt)

  8           8 LOAD_CONST               2 (<code object encrypt_string at 0x7f9d2a441a50, file "test.py", line 8>)
             10 LOAD_CONST               3 ('encrypt_string')
             12 MAKE_FUNCTION            0
             14 STORE_NAME               1 (encrypt_string)

 14          16 LOAD_CONST               4 (<code object encrypt_string1 at 0x7f9d2a441b00, file "test.py", line 14>)
             18 LOAD_CONST               5 ('encrypt_string1')
             20 MAKE_FUNCTION            0
             22 STORE_NAME               2 (encrypt_string1)

 26          24 LOAD_CONST               6 (<code object tryme at 0x7f9d2a441bb0, file "test.py", line 26>)
             26 LOAD_CONST               7 ('tryme')
             28 MAKE_FUNCTION            0
             30 STORE_NAME               3 (tryme)

 33          32 LOAD_CONST               8 (<code object encrypt_string2 at 0x7f9d2a441c60, file "test.py", line 33>)
             34 LOAD_CONST               9 ('encrypt_string2')
             36 MAKE_FUNCTION            0
             38 STORE_NAME               4 (encrypt_string2)

 42          40 LOAD_CONST              10 (<code object looser at 0x7f9d2a441d10, file "test.py", line 42>)
             42 LOAD_CONST              11 ('looser')
             44 MAKE_FUNCTION            0
             46 STORE_NAME               5 (looser)

 45          48 LOAD_CONST              12 (<code object func1 at 0x7f9d2a441dc0, file "test.py", line 45>)
             50 LOAD_CONST              13 ('func1')
             52 MAKE_FUNCTION            0
             54 STORE_NAME               6 (func1)

 48          56 LOAD_CONST              14 (<code object func2 at 0x7f9d2a441e70, file "test.py", line 48>)
             58 LOAD_CONST              15 ('func2')
             60 MAKE_FUNCTION            0
             62 STORE_NAME               7 (func2)

 51          64 LOAD_CONST              16 (<code object func3 at 0x7f9d2a441f20, file "test.py", line 51>)
             66 LOAD_CONST              17 ('func3')
             68 MAKE_FUNCTION            0
             70 STORE_NAME               8 (func3)

 54          72 LOAD_CONST              18 (<code object func4 at 0x7f9d2a442080, file "test.py", line 54>)
             74 LOAD_CONST              19 ('func4')
             76 MAKE_FUNCTION            0
             78 STORE_NAME               9 (func4)

 58          80 LOAD_CONST              20 (<code object main at 0x7f9d2a443ec0, file "test.py", line 58>)
             82 LOAD_CONST              21 ('main')
             84 MAKE_FUNCTION            0
             86 STORE_NAME              10 (main)

 77          88 LOAD_NAME               10 (main)
             90 CALL_FUNCTION            0
             92 POP_TOP
             94 LOAD_CONST              22 (None)
             96 RETURN_VALUE
  9           0 LOAD_CONST               1 ('')
              2 STORE_FAST               1 (tmp_string)

 10           4 LOAD_FAST                0 (string)
              6 GET_ITER
        >>    8 FOR_ITER                12 (to 34)
             10 STORE_FAST               2 (letter)

 11          12 LOAD_FAST                1 (tmp_string)
             14 LOAD_GLOBAL              0 (chr)
             16 LOAD_GLOBAL              1 (ord)
             18 LOAD_FAST                2 (letter)
             20 CALL_FUNCTION            1
             22 LOAD_CONST               2 (1)
             24 BINARY_ADD
             26 CALL_FUNCTION            1
             28 INPLACE_ADD
             30 STORE_FAST               1 (tmp_string)
             32 JUMP_ABSOLUTE            4 (to 8)

 12     >>   34 LOAD_GLOBAL              2 (looser)
             36 CALL_FUNCTION            0
             38 POP_TOP
             40 LOAD_CONST               0 (None)
             42 RETURN_VALUE
 15           0 LOAD_CONST               1 ('')
              2 STORE_FAST               1 (tmp_string)

 16           4 LOAD_CONST               2 (1)
              6 STORE_FAST               2 (it)

 17           8 LOAD_FAST                0 (string)
             10 GET_ITER
        >>   12 FOR_ITER                31 (to 76)
             14 STORE_FAST               3 (letter)

 18          16 LOAD_FAST                2 (it)
             18 LOAD_CONST               2 (1)
             20 COMPARE_OP               2 (==)
             22 POP_JUMP_IF_FALSE       25 (to 50)

 19          24 LOAD_FAST                1 (tmp_string)
             26 LOAD_GLOBAL              0 (chr)
             28 LOAD_GLOBAL              1 (ord)
             30 LOAD_FAST                3 (letter)
             32 CALL_FUNCTION            1
             34 LOAD_CONST               2 (1)
             36 BINARY_ADD
             38 CALL_FUNCTION            1
             40 INPLACE_ADD
             42 STORE_FAST               1 (tmp_string)

 20          44 LOAD_CONST               3 (0)
             46 STORE_FAST               2 (it)
             48 JUMP_ABSOLUTE            6 (to 12)

 22     >>   50 LOAD_FAST                1 (tmp_string)
             52 LOAD_GLOBAL              0 (chr)
             54 LOAD_GLOBAL              1 (ord)
             56 LOAD_FAST                3 (letter)
             58 CALL_FUNCTION            1
             60 LOAD_CONST               2 (1)
             62 BINARY_SUBTRACT
             64 CALL_FUNCTION            1
             66 INPLACE_ADD
             68 STORE_FAST               1 (tmp_string)

 23          70 LOAD_CONST               2 (1)
             72 STORE_FAST               2 (it)
             74 JUMP_ABSOLUTE            6 (to 12)

 24     >>   76 LOAD_FAST                1 (tmp_string)
             78 RETURN_VALUE
 27           0 LOAD_GLOBAL              0 (print)
              2 LOAD_FAST                0 (string)
              4 CALL_FUNCTION            1
              6 POP_TOP

 28           8 LOAD_FAST                0 (string)
             10 LOAD_CONST               1 ('NBUE|sStd^ShhnMN~')
             12 COMPARE_OP               2 (==)
             14 POP_JUMP_IF_FALSE       14 (to 28)

 29          16 LOAD_GLOBAL              0 (print)
             18 LOAD_CONST               2 ('GG ! Use this password as flag')
             20 CALL_FUNCTION            1
             22 POP_TOP
             24 LOAD_CONST               0 (None)
             26 RETURN_VALUE

 31     >>   28 LOAD_GLOBAL              1 (looser)
             30 CALL_FUNCTION            0
             32 POP_TOP
             34 LOAD_CONST               0 (None)
             36 RETURN_VALUE
 34           0 LOAD_CONST               1 ('')
              2 STORE_FAST               1 (tmp_string)

 35           4 LOAD_FAST                0 (string)
              6 GET_ITER
        >>    8 FOR_ITER                10 (to 30)
             10 STORE_FAST               2 (letter)

 36          12 LOAD_FAST                1 (tmp_string)
             14 LOAD_FAST                2 (letter)
             16 LOAD_CONST               2 (2)
             18 BINARY_MULTIPLY
             20 LOAD_CONST               3 (15)
             22 BINARY_SUBTRACT
             24 INPLACE_ADD
             26 STORE_FAST               1 (tmp_string)
             28 JUMP_ABSOLUTE            4 (to 8)

 37     >>   30 LOAD_FAST                1 (tmp_string)
             32 LOAD_CONST               4 ('MCTF{fake_flag}')
             34 COMPARE_OP               2 (==)
             36 POP_JUMP_IF_FALSE       24 (to 48)

 38          38 LOAD_GLOBAL              0 (looser)
             40 CALL_FUNCTION            0
             42 POP_TOP
             44 LOAD_CONST               0 (None)
             46 RETURN_VALUE

 40     >>   48 LOAD_GLOBAL              0 (looser)
             50 CALL_FUNCTION            0
             52 POP_TOP
             54 LOAD_CONST               0 (None)
             56 RETURN_VALUE
 43           0 LOAD_GLOBAL              0 (print)
              2 LOAD_CONST               1 ('Bad password, looser !')
              4 CALL_FUNCTION            1
              6 POP_TOP
              8 LOAD_CONST               0 (None)
             10 RETURN_VALUE
 46           0 LOAD_GLOBAL              0 (print)
              2 LOAD_GLOBAL              1 (useless_encrypt)
              4 LOAD_FAST                0 (string)
              6 CALL_FUNCTION            1
              8 CALL_FUNCTION            1
             10 POP_TOP
             12 LOAD_CONST               0 (None)
             14 RETURN_VALUE
 49           0 LOAD_GLOBAL              0 (print)
              2 LOAD_GLOBAL              1 (encrypt_string)
              4 LOAD_FAST                0 (string)
              6 CALL_FUNCTION            1
              8 CALL_FUNCTION            1
             10 POP_TOP
             12 LOAD_CONST               0 (None)
             14 RETURN_VALUE
 52           0 LOAD_GLOBAL              0 (tryme)
              2 LOAD_GLOBAL              1 (encrypt_string1)
              4 LOAD_FAST                0 (string)
              6 CALL_FUNCTION            1
              8 CALL_FUNCTION            1
             10 POP_TOP
             12 LOAD_CONST               0 (None)
             14 RETURN_VALUE
 55           0 LOAD_GLOBAL              0 (print)
              2 LOAD_GLOBAL              1 (encrypt_string2)
              4 LOAD_FAST                0 (string)
              6 CALL_FUNCTION            1
              8 CALL_FUNCTION            1
             10 POP_TOP
             12 LOAD_CONST               0 (None)
             14 RETURN_VALUE
 59           0 LOAD_GLOBAL              0 (input)
              2 LOAD_CONST               1 ('Please enter the password : ')
              4 CALL_FUNCTION            1
              6 STORE_FAST               0 (user_input)

 61           8 LOAD_GLOBAL              1 (func1)
             10 LOAD_GLOBAL              2 (func2)
             12 LOAD_GLOBAL              3 (func3)
             14 LOAD_GLOBAL              4 (func4)
             16 LOAD_CONST               2 ((1, 2, 3, 4))
             18 BUILD_CONST_KEY_MAP      4
             20 STORE_FAST               1 (funcmap)

 63          22 LOAD_GLOBAL              5 (len)
             24 LOAD_FAST                0 (user_input)
             26 CALL_FUNCTION            1

 64          28 DUP_TOP
             30 LOAD_CONST               3 (12)
             32 COMPARE_OP               2 (==)
             34 POP_JUMP_IF_FALSE       27 (to 54)
             36 POP_TOP

 65          38 LOAD_FAST                1 (funcmap)
             40 LOAD_CONST               4 (1)
             42 BINARY_SUBSCR
             44 LOAD_FAST                0 (user_input)
             46 CALL_FUNCTION            1
             48 POP_TOP
             50 LOAD_CONST               0 (None)
             52 RETURN_VALUE

 66     >>   54 DUP_TOP
             56 LOAD_CONST               5 (15)
             58 COMPARE_OP               2 (==)
             60 POP_JUMP_IF_FALSE       40 (to 80)
             62 POP_TOP

 67          64 LOAD_FAST                1 (funcmap)
             66 LOAD_CONST               6 (2)
             68 BINARY_SUBSCR
             70 LOAD_FAST                0 (user_input)
             72 CALL_FUNCTION            1
             74 POP_TOP
             76 LOAD_CONST               0 (None)
             78 RETURN_VALUE

 68     >>   80 DUP_TOP
             82 LOAD_CONST               7 (17)
             84 COMPARE_OP               2 (==)
             86 POP_JUMP_IF_FALSE       53 (to 106)
             88 POP_TOP

 69          90 LOAD_FAST                1 (funcmap)
             92 LOAD_CONST               8 (3)
             94 BINARY_SUBSCR
             96 LOAD_FAST                0 (user_input)
             98 CALL_FUNCTION            1
            100 POP_TOP
            102 LOAD_CONST               0 (None)
            104 RETURN_VALUE

 70     >>  106 LOAD_CONST               9 (19)
            108 COMPARE_OP               2 (==)
            110 POP_JUMP_IF_FALSE       64 (to 128)

 71         112 LOAD_FAST                1 (funcmap)
            114 LOAD_CONST              10 (4)
            116 BINARY_SUBSCR
            118 LOAD_FAST                0 (user_input)
            120 CALL_FUNCTION            1
            122 POP_TOP
            124 LOAD_CONST               0 (None)
            126 RETURN_VALUE

 72     >>  128 NOP

 73         130 LOAD_GLOBAL              6 (looser)
            132 CALL_FUNCTION            0
            134 POP_TOP
            136 LOAD_CONST               0 (None)
            138 RETURN_VALUE

```

On trouve les lignes ci dessous qui semblent être affichées lorsque le chall est validé : 

```
 28           8 LOAD_FAST                0 (string)
             10 LOAD_CONST               1 ('NBUE|sStd^ShhnMN~')
             12 COMPARE_OP               2 (==)
             14 POP_JUMP_IF_FALSE       14 (to 28)

 29          16 LOAD_GLOBAL              0 (print)
             18 LOAD_CONST               2 ('GG ! Use this password as flag')
             20 CALL_FUNCTION            1

```

Après chiffrement le password doit donc être égal à 'NBUE|sStd^ShhnMN~'  

Juste avant, on voit un espèce de chiifrement. On essaye de le déchiffrer : 


```
 16           4 LOAD_CONST               2 (1)
              6 STORE_FAST               2 (it)

 17           8 LOAD_FAST                0 (string)
             10 GET_ITER
        >>   12 FOR_ITER                31 (to 76)
             14 STORE_FAST               3 (letter)

 18          16 LOAD_FAST                2 (it)
             18 LOAD_CONST               2 (1)
             20 COMPARE_OP               2 (==)
             22 POP_JUMP_IF_FALSE       25 (to 50)

 19          24 LOAD_FAST                1 (tmp_string)
             26 LOAD_GLOBAL              0 (chr)
             28 LOAD_GLOBAL              1 (ord)
             30 LOAD_FAST                3 (letter)
             32 CALL_FUNCTION            1
             34 LOAD_CONST               2 (1)
             36 BINARY_ADD
             38 CALL_FUNCTION            1
             40 INPLACE_ADD
             42 STORE_FAST               1 (tmp_string)

 20          44 LOAD_CONST               3 (0)
             46 STORE_FAST               2 (it)
             48 JUMP_ABSOLUTE            6 (to 12)

 22     >>   50 LOAD_FAST                1 (tmp_string)
             52 LOAD_GLOBAL              0 (chr)
             54 LOAD_GLOBAL              1 (ord)
             56 LOAD_FAST                3 (letter)
             58 CALL_FUNCTION            1
             60 LOAD_CONST               2 (1)
             62 BINARY_SUBTRACT
             64 CALL_FUNCTION            1
             66 INPLACE_ADD
             68 STORE_FAST               1 (tmp_string)

 23          70 LOAD_CONST               2 (1)
             72 STORE_FAST               2 (it)
             74 JUMP_ABSOLUTE            6 (to 12)

```

on comprend que le code d'origone doit ressembler à ça : 

```py
tmp_string = ""
it = 1
for letter in string:
    if it == 1:
        tmp_string += chr(ord(letter) + 1)
        it = 0
    else:
        tmp_string += chr(ord(letter) - 1)
        it = 1
```

Une fois la fonction déchiffrer, on obtient MCTF{tRuc_RigoLO}.


## **Flag : `MCTF{tRuc_RigoLO}`**
