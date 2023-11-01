FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENV DATABASE_URL mongodb://127.0.0.1:27017/
ENV DATABASE_NAME biometric-time-dev
ENV PORT 3055

CMD [ "node", "./src/index.js" ]
