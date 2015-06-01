# DOCKER-VERSION 0.3.4
FROM node:0.10

ADD . /
RUN npm install

EXPOSE 8880
CMD node service.js
