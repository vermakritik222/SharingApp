FROM node:alpine

WORKDIR /app

COPY ./package.json .

RUN npm i

COPY . .

CMD ["node","server.js","--bind" ,"0.0.0.0:$PORT"]