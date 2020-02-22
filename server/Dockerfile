FROM ubuntu:16.04
RUN apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys B97B0AFCAA1A47F044F244A07FCC7D46ACCC4CF8
RUN echo "deb http://apt.postgresql.org/pub/repos/apt/ precise-pgdg main" > /etc/apt/sources.list.d/pgdg.list
RUN apt-get update && apt-get install -y python-software-properties software-properties-common postgresql-9.3 postgresql-client-9.3 postgresql-contrib-9.3 
RUN apt-get install -y virtualenv python-pip libpq-dev python-dev wget curl

RUN virtualenv pgadmin4
RUN wget https://ftp.postgresql.org/pub/pgadmin/pgadmin4/v1.4/pip/pgadmin4-1.4-py2.py3-none-any.whl

RUN pip install pgadmin4-1.4-py2.py3-none-any.whl
RUN echo "SERVER_MODE = False" >> /pgadmin4/lib/python2.7/site-packages/pgadmin4/config_local.py

USER postgres
RUN    /etc/init.d/postgresql start &&\
    psql --command "CREATE USER docker WITH SUPERUSER PASSWORD 'docker';" &&\
    createdb -O docker docker

RUN echo "host all  all    0.0.0.0/0  md5" >> /etc/postgresql/9.3/main/pg_hba.conf

# And add ``listen_addresses`` to ``/etc/postgresql/9.3/main/postgresql.conf``
RUN echo "listen_addresses='*'" >> /etc/postgresql/9.3/main/postgresql.conf
EXPOSE 5432
EXPOSE 8080

# Add VOLUMEs to allow backup of config, logs and databases
VOLUME  ["/etc/postgresql", "/var/log/postgresql", "/var/lib/postgresql"]


RUN python lib/python2.7/site-packages/pgadmin4/pgAdmin4.py &
CMD ["/usr/lib/postgresql/9.3/bin/postgres", "-D", "/var/lib/postgresql/9.3/main", "-c", "config_file=/etc/postgresql/9.3/main/postgresql.conf"]