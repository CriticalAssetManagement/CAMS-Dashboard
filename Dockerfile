FROM node:lts

WORKDIR /app

COPY . /app
RUN npm i --legacy-peer-deps
CMD ["npm", "start"]
