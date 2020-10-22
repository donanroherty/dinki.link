FROM node:14.11-alpine3.12 as build-env

WORKDIR /app

COPY ../app ./app

RUN yarn build

FROM nginx:1.19-alpine

COPY --from=build-env /app/build /usr/share/nginx/html

EXPOSE 8080