FROM node:18.12.1

RUN apt-get install -y git
RUN git clone https://github.com/Syarif93/todo-app-test.git

ENV MYSQL_HOST=$MYSQL_HOST
ENV MYSQL_USER=$MYSQL_USER
ENV MYSQL_PASSWORD=$MYSQL_PASSWORD
ENV MYSQL_DBNAME=$MYSQL_DBNAME

WORKDIR /todo-app-test

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8090

CMD [ "npm", "start" ]