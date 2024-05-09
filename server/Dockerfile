FROM node:18

WORKDIR /app

COPY package.json /app
COPY locales /app/locales
COPY .env.* /app
COPY pnpm-lock.yaml /app
COPY .npmrc /app
COPY dist /app/dist

RUN npm install pnpm -g

RUN pnpm i

CMD ["npm", "run", "start:prod"]