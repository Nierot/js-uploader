FROM node:12.18.2-alpine3.11

RUN npm install formidable http mv

RUN mkdir /app
RUN mkdir /music

RUN chown node:node /app
RUN chown node:node /music

COPY . /app

CMD ["node", "/app/main.js"]