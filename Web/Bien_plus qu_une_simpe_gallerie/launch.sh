docker build -t chall_lfitorce .
docker run --name lfitorce -p 9000:80 -p 9022:22 -dit chall_lfitorce