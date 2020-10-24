# Build server
###################################################
FROM golang:1.14-alpine as build-env

WORKDIR /dinkilink

RUN apk update && apk add --no-cache gcc musl-dev git bash

COPY ./api/go.mod ./api/go.sum ./

RUN go mod download

COPY ./api .

RUN go build -ldflags '-w -s' -a -o ./bin/api ./cmd/app


# Build app
###################################################
# FROM node:14.11-alpine3.12 as app-build-env

# WORKDIR /dinkilink

# RUN apk update && apk add --no-cache bash

# COPY ./app .

# RUN yarn

# RUN yarn build

# Deploy
###################################################
FROM alpine:3.12
RUN apk update && apk add --no-cache bash

COPY --from=build-env /dinkilink/bin/api /srv/http/dinkilink
# COPY --from=app-build-env /dinkilink/build /srv/www/dinkilink

EXPOSE 8080 80

CMD ["/srv/http/dinkilink"]