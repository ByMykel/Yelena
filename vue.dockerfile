FROM node:latest

COPY frontend/package*.json /var/www/docker-vue/

WORKDIR /var/www/docker-vue

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "serve" ]