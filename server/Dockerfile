FROM node:22-alpine 

WORKDIR /src
COPY package.json yarn.lock /src/
EXPOSE 5000

# ENV DATABASE_URL=postgresql://super_user:rxaG2cFtvmxQgWGdU4TW5ZynxTxzdY56@dpg-cur8h4an91rc73960i8g-a.oregon-postgres.render.com/fbi_main_db

RUN npm install prisma -g

RUN yarn install
COPY . /src

RUN npx prisma migrate deploy --schema ./prisma/schema.prisma
CMD ["yarn", "start"]