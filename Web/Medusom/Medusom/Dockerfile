FROM php:7.3-apache

RUN apt-get update
RUN apt-get upgrade -y

# Installations des basiques
RUN DEBIAN_FRONTEND=noninteractive apt-get install --no-install-recommends --fix-missing -y libpq-dev
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y libxml2-dev libbz2-dev zlib1g-dev libsqlite3-dev libsqlite3-0 libdbus-glib-1-2


# Installation des extensions PHP
RUN docker-php-ext-install intl
RUN docker-php-ext-install mysqli pdo pdo_mysql
RUN docker-php-ext-enable mysqli
RUN docker-php-ext-enable pdo
RUN docker-php-ext-enable pdo_mysql

# Installation de packages additionnels
RUN DEBIAN_FRONTEND=noninteractive apt-get -y install --fix-missing netcat curl nano expect chromium

# Installation de python
RUN apt install -y python3 python3-pip screen
RUN pip install --upgrade pip
RUN pip install playwright websockets

COPY botChat.py /botChat.py.original
RUN chmod 500 /botChat.py.original

# Initialisation des variables d'environnement
RUN echo "MCTF{RC3_W1TH_S3SSIONS_1\$_FUN}" > /var/www/html/flag5butwithaspecialformat.txt; chmod 777 /var/www/html/*.txt
RUN echo "MCTF{1\$_RC3_L3G1T_1N_W3B_CH4LL??}" > /flag6.txt; chmod 400 /flag6.txt

# Installation du serveur web
RUN rm -rf /etc/apache2/sites-enabled/*
COPY site.conf /etc/apache2/sites-enabled/site.conf
ADD html /var/www/html
COPY environment.conf /etc/apache2/conf-enabled/enviro.conf.original
RUN mkdir /tmp/sessions
COPY leaks /tmp/lfivar/leaks/
ADD db.sqlite /tmp/lfivar/db/
RUN chown 33:33 /var/www/html -R
RUN a2enmod rewrite

# Installation du script de démarrage
RUN echo 'root:bienjouechef123456' | chpasswd
ADD entrypoint.sh /atlas.sh
RUN chmod 500 /atlas.sh;
CMD ["/atlas.sh"]