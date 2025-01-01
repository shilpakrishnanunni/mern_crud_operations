FROM node:20-alpine

WORKDIR /code

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm install -g nodemon

# CMD ["nodemon", "--watch", "./src", "--exec", "ts-node", "./src/index.ts"]