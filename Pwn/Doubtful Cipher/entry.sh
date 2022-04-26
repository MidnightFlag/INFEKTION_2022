#!/bin/bash

while :
do
	su -c "exec socat TCP-LISTEN:9001,reuseaddr,fork EXEC:'/pwn/DoubtfulCipher,pty,stderr'" - pwnuser;
done
