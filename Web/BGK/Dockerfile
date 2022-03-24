FROM golang:1.18
RUN useradd enituop
RUN apt-get update
RUN apt-get install -y git && apt-get install -y python3 && apt-get install -y python3-pip
RUN apt install wget
RUN apt install curl
RUN go install -v github.com/projectdiscovery/notify/cmd/notify@latest
RUN mv /go/bin/notify /usr/bin/
COPY ./flag.txt /root/
RUN chmod 600 /root/flag.txt
RUN apt-get -y install cron
COPY job-cron /etc/cron.d/job-cron
RUN chmod 0640 /etc/cron.d/job-cron
RUN crontab /etc/cron.d/job-cron
COPY start.sh /start.sh
RUN chmod +x /start.sh
COPY ./provider-config.yaml /root/.config/notify/
RUN chmod 755 /root ; chmod 777 /root/.config ; chmod 777 /root/.config/notify; chmod 777 /root/.config/notify/provider-config.yaml
EXPOSE 8181
WORKDIR /home/enituop
COPY ./BGK/ /home/enituop/web
RUN chown -R enituop:enituop /home/enituop/web/
RUN pip3 install -r /home/enituop/web/requirements.txt
RUN pip3 install lxml
ENV FLASK_APP=web
USER root
CMD ["bash","/start.sh"]
