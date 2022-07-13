FROM node:alpine

ENV MONGO_CONNECTION_URL=mongodb://mongoadmin:<PASSWORD>@mongodb \
    DATABASE_CONNECTION_PASSWORD=secret \
    APP_BASE_URL=http://127.0.0.1:8000 \
    PORT=8000

WORKDIR /app

COPY . .

RUN npm i

CMD ["npm","start"]