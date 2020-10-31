# dinki.link

http://dinki.link
DinkiLink is a URL shortener built with React, Go, PostgreSQL and Docker.  It is very much a work in progress.


## Deployment

### Network
For deployment I use an NGINX reverse proxy to redirect traffic.  
The reverseproxy network references can removed docker-compose.yml if not needed.


### Environment vars
Create '.env' file in *project-root/db/*.  These variables are passed as environment varables by *docker-compose.yml* to the database and api containers for initialization and connection.
```
# /db/.env
POSTGRES_DB=dinkilink
POSTGRES_USER=dinkilink
POSTGRES_PASSWORD=root_password
POSTGRES_API_USER=api
POSTGRES_API_PASSWORD=password
```

If editing the server, make sure *docker-compose.yml* references your custom server image.

### Launch
```
docker-compose up
```
On first launch, the database is initialized and a volume is created to hold its data.  See */db/init-db.sh* for db setup.
