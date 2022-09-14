FROM node:16.17.0-alpine

WORKDIR /app

COPY . .

RUN apk add netcat-openbsd

RUN yarn install

CMD ["sh", "entrypoint.sh"]