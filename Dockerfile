FROM node:18-alpine

WORKDIR /app

COPY package.json /app

COPY yarn.lock /app

RUN yarn install

COPY . .

RUN yarn build

RUN rm -rf node_modules

RUN yarn install --production

EXPOSE 3333

CMD ["yarn", "start"]
