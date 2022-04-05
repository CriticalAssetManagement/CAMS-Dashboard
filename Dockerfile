FROM node:lts

WORKDIR /app

COPY . /app
RUN npm i
CMD ["npm", "start"]
