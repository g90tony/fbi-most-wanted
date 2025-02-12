FROM node:22-alpine as base

WORKDIR /src
COPY package.json yarn.lock /src/
EXPOSE 5000

FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY . /src
CMD ["yarn", "start"]

FROM base as dev
ENV NODE_ENV=development
ENV VITE_API_URL=http://localhost:5000/
RUN yarn add nodemon -g && yarn install
COPY . /src
CMD ["yarn", "dev"]