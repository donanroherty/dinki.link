FROM golang:1.14-alpine as build-env
WORKDIR /dinkilink

RUN apk update && apk add --no-cache gcc musl-dev git bash

COPY ./api/go.mod ./api/go.sum ./
RUN go mod download

COPY ./api .

RUN go build -ldflags '-w -s' -a -o ./bin/app ./cmd/app

FROM alpine
RUN apk update && apk add --no-cache bash

COPY --from=build-env /dinkilink/bin/app /dinkilink/app

EXPOSE 8080
CMD ["/dinkilink/app"]