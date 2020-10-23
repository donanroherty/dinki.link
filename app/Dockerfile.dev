FROM node:14.11-alpine3.12

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./

RUN yarn
RUN yarn add react-scripts@3.4.1            

COPY . ./

EXPOSE 3000

CMD yarn start