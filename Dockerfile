# Build app
FROM johnpapa/angular-cli:latest as build
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN ng build --prod

# Serve app
FROM nginx:1.17.1-alpine
COPY --from=build /app/dist/QuestophantFrontend /usr/share/nginx/html
