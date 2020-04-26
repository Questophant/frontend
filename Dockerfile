# Build app
FROM johnpapa/angular-cli as build
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN ng build --prod

# Serve app
FROM nginx:1.17.1-alpine
COPY --from=build /app/dist/CMFrontend /usr/share/nginx/html
