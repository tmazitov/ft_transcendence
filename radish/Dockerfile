FROM node:22

WORKDIR /app

ARG PORT

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE ${PORT}

CMD ["sh", "./docker-run.sh"]