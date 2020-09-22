FROM golang:1.14-alpine 

WORKDIR /dinkilink

RUN apk update && apk add --no-cache gcc musl-dev git bash

COPY ./api ./src/

WORKDIR /dinkilink/src

RUN go mod download

RUN go get github.com/go-delve/delve/cmd/dlv
RUN go get github.com/githubnemo/CompileDaemon

EXPOSE 8080 40000

WORKDIR /dinkilink/src

CMD CompileDaemon \
    --build="go build -gcflags=`all=-N -l` -ldflags=`-w -s` -a -o ../app ./cmd/app" \ 
    --command="../app"
# --command="dlv --listen=:40000 --headless=true --api-version=2 --accept-multiclient exec ../app"