FROM node:22

WORKDIR /usr/src/app

COPY package*.json /usr/src/app
COPY tsconfig.json /usr/src/app

RUN npm install

COPY . /usr/src/app

EXPOSE 3000

RUN npm run build

CMD [ "npm", "run", "start:dev" ]