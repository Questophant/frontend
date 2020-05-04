![Check build](https://github.com/Questophant/frontend/workflows/Check%20build/badge.svg?branch=master)

# Questophant Frontend

Hi, this is the frontend of the Questophant App.
It was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.7.

## Getting started

-   clone repository
-   change into the newly created folder
-   run `npm install`
-   run `npm install -g @angular/cli`
-   run `ng serve -o`
-   In default, the app is mocking the backend. To run against the backend, run `ng serve --prod` instead

For developing we chose VSCode.
Essential plugins:

-   https://marketplace.visualstudio.com/items?itemName=johnpapa.angular-essentials
-   https://marketplace.visualstudio.com/items?itemName=cyrilletuzi.angular-schematics

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Endpoints

When starting the development server or the build process, the backend of the application is selectable via command line. Choose one of the following options by passing the argument "--configuration=local/test/production"

-   "local": The app tries to connect to a backend, running locally.
-   "test": The app connects to test.questophant.de.
-   "production": The app connects to app.questophant.de.

If you do not pass any of these values, a simulation backend is employed, which does not open any connection anywhere.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
