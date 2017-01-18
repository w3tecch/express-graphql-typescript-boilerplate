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

## Exploring the boilerplate
### Structure
Comming Soon
```
```

## License
 [MIT](/LICENSE)
