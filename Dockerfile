# https://github.com/jnt0r/angular-server-image
# Build app
FROM node:12.18.0-alpine as build
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build:prod
RUN mv /app/dist/* /app/built

# Serve app
FROM nginx:1.19.0-alpine
COPY --from=build /app/built /usr/share/nginx/html
