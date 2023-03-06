FROM node:18.14.2-alpine

WORKDIR /app

COPY . .

RUN npm i -g npm
RUN npm update 
RUN npm i

EXPOSE 3334

CMD ["npm","run", "dev"]
