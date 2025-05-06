FROM node:22

WORKDIR /app

ENV PORT=5100

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE ${PORT}

CMD ["sh", "./docker-run.sh"]