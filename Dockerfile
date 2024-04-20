FROM node:lts-alpine3.19
COPY ./app .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]