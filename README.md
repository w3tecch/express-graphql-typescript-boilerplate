# express-graphql-typescript-boilerplate

[![Build Status](https://travis-ci.org/w3tecch/express-graphql-typescript-boilerplate.svg?branch=master)](https://travis-ci.org/w3tecch/express-graphql-typescript-boilerplate.svg?branch=master)

This is a boilerplate for Node.js app written in [TypeScript](https://www.typescriptlang.org/). We used the framework [Express.js](http://expressjs.com/) as a basic layer and on that we setup the awesome [GrapQL](http://graphql.org/) library.

## Getting Started
### Prerequisites
Install [Node.js](http://nodejs.org)
	- on OSX use [homebrew](http://brew.sh) `brew install node`
	- on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`

## Installing
* `fork` this repo
* `clone` your fork
* `npm install` to install all dependencies
* `npm run install:typings` to install all typings
* `npm run serve` to start the dev server in another tab

## Running the app
After you have installed all dependencies you can now run the app.
Run `npm run serve` to start a local server using `nodemon` which will watch for changes and then will restart the sever.
The port will be displayed to you as `http://0.0.0.0:3000` (or if you prefer IPv6, if you're using `express` server, then it's `http://[::1]:3000/`).

## Scripts / Commands
### Install
* Install all dependencies with `npm install`
* Install all typings with `npm run install:typings`
* To install all dependencies and typings use `npm run install:dev`
* Remove not needed libraries with `npm run install:clean`

### Linting
* Run code analysis using `npm run lint`. This runs tshint.

### Tests
* Run the unit tests using `npm test` or `npm run test:pretty` for more detailed reporting.

### Running in dev mode
* Run `npm run serve` to start nodemon with ts-node, which will serve your app.
* The server address will be displayed to you as `http://0.0.0.0:3000`

### Cleaning the project
* Run `npm run clean` to remove all generated JavaScript files.

### Building the project
* Run `npm run build` to generated all JavaScript files from your TypeScript sources. After this step you can deploy the app on any server.
* To start the builded app use `npm start`.
* With `npm run zip` it will generate the JavaScript source and pack them into to a deployable zip file into the dist folder.

### Docs
* Run `npm run docs` to generate all doc files and serve it on `http://0.0.0.0:8080`

### Seed
* Run `npm run seed` to seed some data into the database

## Exploring the boilerplate
### Structure
```
express-graphql-typescript-boilerplate
 |-- build/                         * our task runner configurations and tasks
 |    |-- tasks/                    * gulp tasks
 |    |-- paths.js                  * project path setup for our gulp tasks
 |    |-- util.js                   * our gulp helper functions
 |
 |-- docs/                          * our generated doc files
 |
 |-- src/                           * our source files that will be compiled to javascript
 |    |-- core/                     * our core functionalities
 |    |    |-- application.ts       * our express helper functions to init and run the server
 |    |    |-- environment.ts       * gets us the configuration for the given environment
 |    |    |-- logger.ts            * our logger configurations
 |    |    |-- server.ts            * our server error handling
 |    |
 |    |-- environments/             * our environment configurations
 |    |    |-- development.ts       * our development environment configuration to run our server locally
 |    |    |-- production.ts        * the production environment is used to run on a server(cloud)
 |    |    |-- test.ts              * our test environment configurations
 |    |
 |    |-- middlewares/              * our express custom middlewares (/*.middleware.ts)
 |    |
 |    |-- models/                   * our database models (/*.model.ts)
 |    |
 |    |-- repositories/             * use a repository to separate the logic that retrieves the data and maps it to the entity model from the business logic that acts on the model
 |    |    |-- **/*.ts              * use a single file for every query function.
 |    |
 |    |-- schemas/                  * our graphql schema definitions
 |    |    |-- **/*.type.spec       * our graphql type files
 |    |    |-- **/*.query.spec      * our graphql query files
 |    |    |-- **/*.mutation.spec   * our graphql mutation files
 |    |
 |    |-- index.ts                  * main entry point for our application
 |
 |-- test/                          * our test files that will test our application
 |    |-- mocks                     * we use this to simulate other functions, classes or objects
 |    |-- **/*.spec.ts              * our test cases
 |
 |-- typings_custom/                * our local type definitions
 |
 |-- gulpfile.js                    * entry point for our gulp tasks
 |-- nodemon.json                   * nodemon setup, so that it uses typescript and runs tslint
 |-- package.json                   * what npm uses to manage it's dependencies
 |-- tslint.json                    * typescript lint config
 |-- typedoc.json                   * typescript documentation generator
 |-- tsconfig.json                  * typescript config
 |-- wallaby.js                     * our wallaby configuration
```

# Sequelize and the Sequelize CLI: Migration
[Documentation](http://docs.sequelizejs.com/en/v3/docs/migrations/)

## Install
* Navigate to your app's root directory in the terminal
* `npm install --save-dev sequelize-cli`

## Configure
Create a file called `.sequelizerc` in your project root folder
```
var path = require('path');

module.exports = {
    'config': path.resolve('src/core', 'config.js'),
    'seeders-path': path.resolve('src/database', 'seeders'),
    'migrations-path': path.resolve('src/database', 'migrations'),
    'models-path': path.resolve('src', 'models')
};
```

# License
 [MIT](/LICENSE)
