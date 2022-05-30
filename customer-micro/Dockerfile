FROM node:14.16.1-alpine3.11 As development

LABEL maintainer="ramzi.latrous@insat.ucar.tn"

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install 

COPY . .

RUN npm run build

ENTRYPOINT [ "npm","run","start:dev" ]