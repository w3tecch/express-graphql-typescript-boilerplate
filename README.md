[![Build Status](https://travis-ci.org/w3tecch/express-graphql-typescript-boilerplate.svg?branch=master)](https://travis-ci.org/w3tecch/express-graphql-typescript-boilerplate.svg?branch=master)

# express-graphql-typescript-boilerplate
Boilerplate for Node.js app written in TypeScript

# Prerequisites
Install [Node.js](http://nodejs.org)
	- on OSX use [homebrew](http://brew.sh) `brew install node`
	- on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`

# Dependencies
Navigate to your project folder to install all dependencies
  ```
  npm install
  npm run install:typings
  ```

#Scripts / Commands

| Scripts from package.json | Description   |
|:------------------------- |:------------- |
| `npm run install:typings` | Installs all the typings |
| `npm run serve`           | Starts a local server and watches for changes to restart |
| `npm run serve:debug`     | Starts a local server with debugging enabled on port 6666 and watches for changes to restart |
| `npm run start`           | Starts the built app |
| `npm run build`           | Builds the app. Transpiles/Compiles all the TypeScript files |
| `npm run lint`            | Runs the linter over all source and test files |
| `npm run clean`           | Removes all the JavaScript Files in the source and test folder |
| `npm run test`            | Runs all written unit-tests |
| `npm run zip`             | Builds the app and creates a cloudfoundry-ready zip file for upload (if needed) |

#Sources & Tools
##Structure
https://gist.github.com/lancejpollard/1398757

##Tools
- Mail (inkl. Templating) => https://nodemailer.com/
- ACL => https://www.npmjs.com/package/acl / https://www.npmjs.com/package/acl-sequelize
- Resourcefull Rest =>
- Queing Service => https://github.com/Automattic/kue
- Middelware => express
- JWT
- Events => http://docs.sequelizejs.com/
- Test Data => https://www.npmjs.com/package/Faker
- Testing => http://code.tutsplus.com/tutorials/testing-in-nodejs--net-35018
- Logging => https://github.com/trentm/node-bunyan
- Performance => http://expressjs.com/en/advanced/best-practice-performance.html
- Swagger => https://github.com/krakenjs/swaggerize-express
- Cors => https://github.com/expressjs/cors
- Body Parser => https://www.npmjs.com/package/body-parser
- code coverage => https://www.npmjs.com/package/istanbul
- Resource tool (?) => https://github.com/expressjs/express-resource
- asynchronous operations => async.js
- monitoring => https://keymetrics.io, http://newrelic.com/nodejs

##Testing
- mocha
- Provides spies, stubs, and mocks for JavaScript => http://sinonjs.org/
- A library for mocking HTTP connections => https://github.com/node-nock/nock

##Database
- SQL query builder => http://knexjs.org/#
- DB migration => http://docs.sequelizejs.com/
- ORM => http://docs.sequelizejs.com/

##Security
- https://github.com/krakenjs/lusca
- Security => https://www.npmjs.com/package/helmet
- http://expressjs.com/en/advanced/best-practice-security.html
- https://nodesecurity.io/tools
- https://docs.google.com/presentation/d/1KbBG3Z1rTYcXCO8FHb8Br4K08nvQEDPgo2OXfUuWUAU/edit#slide=id.gc6f73a04f_0_0
- https://github.com/samartioli/webapp-security

##Auth
- https://github.com/t1msh/node-oauth20-provider
- https://github.com/andreassolberg/jso
- http://passportjs.org/

### JWT
- https://jwt.io/
- https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens
- https://github.com/auth0/node-jsonwebtoken

##Examples
- https://github.com/Microsoft/TypeScriptSamples/tree/master/imageboard
- https://github.com/geraldpereira/rest-crud
- http://blog.geraldpereira.com/rest/crud/2015/09/10/nodejs-express-typescript.html
- https://github.com/christianalfoni/webpack-express-boilerplate

##Hosting
- http://www.hostingadvice.com/blog/where-to-find-free-node-js-hosting/

# License
 [MIT](/LICENSE)
