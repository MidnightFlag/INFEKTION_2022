FROM php:8.1-apache
COPY ./apache2.conf /etc/apache2/apache2.conf
RUN rm -rf /etc/apache2/sites-available/*
COPY ./sites-available /etc/apache2/sites-available/
RUN rm -rf /var/www/*
COPY ./www /var/www/
COPY ./sites-available /etc/apache2/sites-enabled/
RUN chown www-data:www-data /var/www/russy23.ru/*
RUN echo "127.0.0.1	backup.russy23.ru russy23.ru" >> /etc/hosts
RUN echo "MCTF{1cf35bf5d570cabbe4a7a222b1ad93937abf80b879132a30665479bc5c21ca92}" > /flag.txt
RUN chmod +r /flag.txt
#CMD ["bash","/start.sh"]
