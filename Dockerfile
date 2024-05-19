FROM node:lts

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

ENV MONGO_URI="mongodb://mongodb:27017"

EXPOSE 8000

CMD ["npm", "start"]