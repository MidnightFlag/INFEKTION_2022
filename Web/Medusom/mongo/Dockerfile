FROM mongo:3.6

ADD run.sh /run.sh
ADD set_mongodb_password.sh /set_mongodb_password.sh
ADD mongod.conf /data/configdb/mongod.conf

RUN apt-get update -y && apt-get upgrade -y
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y software-properties-common
RUN add-apt-repository ppa:deadsnakes/ppa -y
RUN chmod +x /run.sh
RUN chmod +x /set_mongodb_password.sh
CMD ["/run.sh"]