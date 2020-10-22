FROM golang:1.14-alpine 

WORKDIR /dinkilink/app/src

RUN apk update && apk add --no-cache gcc musl-dev git bash

COPY . .

RUN go mod download

RUN go get github.com/go-delve/delve/cmd/dlv
RUN go get github.com/githubnemo/CompileDaemon

EXPOSE 8080 40000 80

# RUN go build -ldflags '-w -s' -a -o ../bin ./cmd/app

CMD CompileDaemon \
    --build="go build -gcflags=`all=-N -l` -ldflags=`-w -s` -a -o ../bin ./cmd/app" \ 
    --command="../bin"
# --command="dlv --listen=:40000 --headless=true --api-version=2 --accept-multiclient exec ../bin"