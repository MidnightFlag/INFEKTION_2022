#!/bin/bash

while :
do
	su -c "exec socat TCP-LISTEN:9003,reuseaddr,fork EXEC:'/pwn/SimpleLeak,pty,stderr'" - pwnuser;
done
