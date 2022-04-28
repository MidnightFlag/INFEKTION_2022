FROM php:7.3-apache

EXPOSE 80
EXPOSE 443
EXPOSE 4490

RUN apt-get update
RUN apt-get upgrade -y

# Installations des basiques
RUN DEBIAN_FRONTEND=noninteractive apt-get install --fix-missing -y libpq-dev
RUN DEBIAN_FRONTEND=noninteractive apt-get install --no-install-recommends -y libpq-dev
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y libxml2-dev libbz2-dev zlib1g-dev
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y libsqlite3-dev libsqlite3-0 mariadb-client curl exif ftp mailutils postfix
RUN apt-get install -y libcurl4-openssl-dev pkg-config libssl-dev

# Installation de packages additionnels
RUN DEBIAN_FRONTEND=noninteractive apt-get -y install --fix-missing netcat curl nano screen git
RUN pecl install mongodb && docker-php-ext-enable mongodb

# Installation de python
RUN apt install -y python3 python3-pip
RUN pip install --upgrade pip
RUN pip install websockets
COPY chat.py /chat.py
RUN chmod +x /chat.py

# Installation du serveur web
RUN rm -rf /etc/apache2/sites-enabled/*
COPY site.conf /etc/apache2/sites-enabled/site.conf
#ADD html /var/www/html
RUN a2enmod rewrite

# Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer self-update --2

# Installation du script de démarrage
ADD entrypoint.sh /atlas.sh
RUN chmod +x /atlas.sh
CMD ["/atlas.sh"]