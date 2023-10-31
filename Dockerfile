FROM node:18.16.0-alpine as build-stage

WORKDIR /app

# not good practice
COPY package.json package-lock.json /app/

RUN npm install

COPY ./ /app/
COPY .dev-stage.env /app/.env

RUN npm run build

FROM nginx:1.15
COPY --from=build-stage /app/dist/ /usr/share/nginx/html

COPY /nginx.conf /etc/nginx/conf.d/default.conf
