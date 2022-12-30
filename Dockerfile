FROM node:18.12.1

WORKDIR /todo-app-test

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV=production
ENV MYSQL_HOST=$MYSQL_HOST
ENV MYSQL_USER=$MYSQL_USER
ENV MYSQL_PASSWORD=$MYSQL_PASSWORD
ENV MYSQL_DBNAME=$MYSQL_DBNAME
ENV APP_PORT=3030

EXPOSE 3030

CMD ["/bin/bash","-c","./startup.sh"]