FROM node:lts-alpine

RUN npm install -g http-server

WORKDIR /api

COPY package*.json ./

RUN npm install


COPY . .



RUN npm run build

EXPOSE 3000
CMD [ "node", "dist/main" ]