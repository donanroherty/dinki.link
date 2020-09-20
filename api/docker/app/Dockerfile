FROM golang:1.14-alpine as build-env
WORKDIR /dinkilink

RUN apk update && apk add --no-cache gcc musl-dev git bash

RUN go get github.com/go-delve/delve/cmd/dlv

COPY ./api/go.mod ./api/go.sum ./
RUN go mod download

COPY ./api .

RUN go build -ldflags '-w -s' -a -o ./bin/app ./cmd/app
# RUN go build -gcflags="all=-N -l" -o ./bin/app ./cmd/app

FROM alpine
RUN apk update && apk add --no-cache bash

COPY --from=build-env /dinkilink/bin/app /dinkilink/app
COPY --from=build-env /go/bin/dlv /

EXPOSE 8080 40000

CMD ["/dinkilink/app"]
# CMD ["/dlv", "--listen=:40000", "--headless=true", "--api-version=2", "--accept-multiclient", "exec", "/dinkilink/app"]