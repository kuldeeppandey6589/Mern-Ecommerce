FROM  node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

ENV CHOKIDAR_USEPOLLING = true
ENV WATCHPACK_POLLING=true

CMD ["node", "server.js"]