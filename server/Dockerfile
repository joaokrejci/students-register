FROM node:alpine

WORKDIR /var/app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
COPY ormconfig.docker.json ./ormconfig.json
EXPOSE 4000

CMD ["yarn", "start"]