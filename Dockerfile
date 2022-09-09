FROM node:lts

WORKDIR /app

COPY . /app
ENV NODE_ENV=development
RUN npm i --legacy-peer-deps
CMD ["npm", "start"]
