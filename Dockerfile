FROM node:lts-alpine3.19
COPY ./app .
RUN npm install
CMD ["npm", "start"]