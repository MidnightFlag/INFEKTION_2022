FROM amd64/debian

RUN apt-get update && apt-get install -y socat

RUN mkdir /pwn
RUN useradd --home=/pwn pwnuser

COPY SimpleLeak /pwn/SimpleLeak
COPY entry.sh /pwn/

RUN chmod 4755 /pwn/SimpleLeak
RUN chmod 4755 /pwn/entry.sh

EXPOSE 9003

ENTRYPOINT ["/pwn/entry.sh"]
