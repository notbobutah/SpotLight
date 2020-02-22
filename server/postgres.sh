docker pull postgres
mkdir -p $HOME/docker/volumes/postgres
docker run --rm --name spotlight -e POSTGRES_PASSWORD=spotlight -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data  postgres
docker ps
echo +++++++++++++++++++++++++++++
echo  try these commands:
echo      docker exec -it spotlight /bin/bash
echo      docker exec -it spotlight psql -h localhost -U postgres 


