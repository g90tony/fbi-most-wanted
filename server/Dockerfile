FROM node:22-alpine 

WORKDIR /src
COPY package.json yarn.lock /src/
EXPOSE 5000

RUN yarn install
COPY . /src
CMD ["yarn", "start"]