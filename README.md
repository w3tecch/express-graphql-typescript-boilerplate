# express-graphql-typescript-boilerplate

[![Build Status](https://travis-ci.org/w3tecch/express-graphql-typescript-boilerplate.svg?branch=master)](https://travis-ci.org/w3tecch/express-graphql-typescript-boilerplate.svg?branch=master)

A [GrapQL](http://graphql.org/) starter kit for building amazing API's in [TypeScript](https://www.typescriptlang.org/) and with [Express.js](http://expressjs.com/) framework.

This seed repository has a complete GraphQL starter kit written in TypeSciprt. For building our API we use varous gulp-tasks. We use jasmine and Wallaby for our unit-testing.
    - Ready to build system with gulp
    - A simple hook system
    - A simple permisson example
    - Fully integrated with express
    - Improved error handling
    - Complete knex integration with:
        - Seeders
        - Migrations
    - Testing examples
    - Basic securty configuration
    - Basic cors configuration
    - Basic logger configuration
    - Multiple environemnt configurations
    - Coverage with wallaby.js
    - Varoius examples
        - Queries and mutations
        - Data-Loaders
        - Basic search query
        - Pagination

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
* Create new database. You will find the name in the `src/core/config.ts` file.
* `npm run db:migrate` to create the schema
* `npm run db:seed` to insert some test data
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
* Run `npm run db:seed` to seed some data into the database

### Migration
* Run `npm run migrate` to migration the new schema to the database
* Run `npm run migrate:rollback` to rollback one version

## Exploring the boilerplate
### Structure
```
express-graphql-typescript-boilerplate
 |-- build/                                     * our task runner configurations and tasks
 |    |-- tasks/                                * gulp tasks
 |    |-- paths.js                              * project path setup for our gulp tasks
 |    |-- util.js                               * our gulp helper functions
 |
 |-- docs/                                      * our generated doc files
 |
 |-- src/                                       * our source files that will be compiled to javascript
 |    |-- common/                               * common helpers
 |    |    |-- tables.ts                        * our database table names
 |    |    |-- utils.ts                         * our collection of util functions
 |    |
 |    |-- context/                              * graphql context
 |    |    |-- context.ts                       * our graphql context class
 |    |    |-- dataloaders-context.ts           * our collection of all dataloaders
 |    |    |-- repositories-context.ts          * our collection of all repositories
 |    |
 |    |-- core/                                 * our core functionalities
 |    |    |-- bootstrap.ts                     * our express helper functions to init and run the server
 |    |    |-- config.ts                        * has our configuration for our different environments
 |    |    |-- database.ts                      * our database setup
 |    |    |-- environment.ts                   * gets us the configuration for the given environment
 |    |    |-- graphql-error-handling.ts        * our error handling
 |    |    |-- logger.ts                        * our logger configurations
 |    |    |-- server.ts                        * our server error handling
 |    |
 |    |-- database/                             * our database tasks
 |    |    |-- factories                        * our factories to create simple fake data
 |    |    |-- migrations                       * our database migration tasks
 |    |    |-- seeds                            * our database seeder tasks
 |    |
 |    |-- errors/                               * our errors to throw to the user
 |    |    |-- user.error.ts                    * our basic user error all other errors should inherit from this one
 |    |    |-- not-found.error.ts               * a basic not found error
 |    |
 |    |-- middlewares/                          * our express custom middlewares (/*.middleware.ts)
 |    |
 |    |-- models/                               * our database models (/*.model.ts)
 |    |
 |    |-- repositories/                         * use a repository to separate the logic that retrieves the data and maps it to the entity model from the business logic that acts on the model
 |    |    |-- **/*.repository.ts
 |    |
 |    |-- schemas/                              * our graphql schema definitions
 |    |    |-- **/*.type.spec                   * our graphql type files
 |    |    |-- **/*.query.spec                  * our graphql query files (use a single file for every query action)
 |    |    |-- **/*.mutation.spec               * our graphql mutation files (use a single file for every mutation action)
 |    |
 |    |-- index.ts                              * main entry point for our application
 |
 |-- test/                                      * our test files that will test our application
 |    |-- mocks                                 * we use this to simulate other functions, classes or objects
 |    |-- unit/**/*.spec.ts                     * our unit test cases
 |
 |-- typings_custom/                            * our local type definitions
 |
 |-- knexfile.ts                                * this has our database configuration from the config.ts
 |-- gulpfile.js                                * entry point for our gulp tasks
 |-- nodemon.json                               * nodemon setup, so that it uses typescript and runs tslint
 |-- package.json                               * what npm uses to manage it's dependencies
 |-- tslint.json                                * typescript lint config
 |-- typedoc.json                               * typescript documentation generator
 |-- tsconfig.json                              * typescript config
 |-- wallaby.js                                 * our wallaby configuration
```

## License
 [MIT](/LICENSE)
