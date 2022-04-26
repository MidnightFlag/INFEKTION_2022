FROM amd64/debian

RUN apt-get update && apt-get install -y socat

RUN mkdir /pwn
RUN useradd --home=/pwn pwnuser

COPY French_Formular /pwn/French_Formular
COPY flag.txt /pwn/flag.txt
COPY entry.sh /pwn/entry.sh

RUN chmod 4755 /pwn/French_Formular
RUN chmod 4755 /pwn/entry.sh

EXPOSE 9002

ENTRYPOINT ["/pwn/entry.sh"]
