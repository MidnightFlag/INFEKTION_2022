FROM php:8.1-apache-bullseye

# Install requirements
RUN apt update && apt upgrade -y && apt dist-upgrade -y && \
    apt install netcat python3 vim sudo ssh -y


### Web configuration ###
RUN chown -R www-data:www-data /var/lib/apache2
ADD  --chown=www-data:www-data web/ /var/www/html/
COPY --chown=www-data:www-data apache2/000-default.conf /etc/apache2/sites-available/000-default.conf

#_ Define apache2 logs directory
RUN rm -Rf /var/log/apache2/*.log

### Privesc configuration ###
RUN useradd -p $(openssl passwd -1 vG86aLvvkFmXgc2J3MyV) mitnick && \
    mkdir /home/mitnick && mkdir -p /home/mitnick/Documents/tools && \
    chown -R mitnick:mitnick /home/mitnick && \
    groupadd agents && usermod -aG agents mitnick

## Mitnick privesc ##

RUN echo "www-data ALL=(mitnick) NOPASSWD: /usr/sbin/service" >> /etc/sudoers

#_ Build vulnerable version of exiftool
# COPY exiftool.zip /tmp
# RUN cd /tmp && unzip exiftool.zip && \ 
#     cd exiftool-53e5dd03d24f5f5a03406510078f9ceaa1b45e45 && \
#     perl Makefile.PL && make install && \
#     mv exiftool /home/mitnick/Documents/tools/exiftool && \
#     rm -Rf /tmp/exiftool* && chown -R mitnick:mitnick /home/mitnick/Documents/tools/exiftool

# _ Add suid capability
# RUN chmod u+s /home/mitnick/Documents/tools/exiftool

## Root privesc ##

#_ Folder rights
RUN mkdir /opt/keys && chmod -R 770 /opt/keys && \
    chown -R root:agents /opt/keys

#_ Motd vuln
COPY update-motd.d/50-motd-news /etc/update-motd.d/50-motd-news
RUN mkdir /root/.ssh && chmod +x /etc/update-motd.d/50-motd-news

# Copy flag
COPY flag.txt /root

# Start ssh server
RUN service ssh start

# Launch apache webserver
CMD apachectl -D FOREGROUND
