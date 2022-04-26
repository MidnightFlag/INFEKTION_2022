#!/bin/bash

while :
do
	su -c "exec socat TCP-LISTEN:9002,reuseaddr,fork EXEC:'/pwn/French_Formular,pty,stderr'" - pwnuser;
done
