// Configure the debug module
process.env.DEBUG = 'app.findAllBooksRequest';
// imports debug moduel
import * as Debug from 'debug';
const debugFindAllBooksRequest = Debug('app:findAllBooksRequest');
const debugRequest = Debug('app:request');
const debugError = Debug('app:error');

import * as request from 'request';
// import * as _ from 'lodash';

let counter = 0;

const findAllBooksRequest = () => {
    return new Promise((resolve, rejct) => {
        debugRequest('Start', counter++);
        request.post('http://localhost:3000/', {
            headers: {
                'Content-Type': 'application/graphql'
            },
            body: `query {
                        findAllBooks {
                            title
                            autor {
                            firstName
                            lastName
                            }
                        }
                    }`
        }, (error, response) => {
            if (!error && response.statusCode === 200) {
                debugRequest('End', counter);
            } else {
                debugError(error);
            }
            resolve();
        });
    });
};


debugFindAllBooksRequest('Start');

Promise
    .all([
        findAllBooksRequest()
    ])
    .then((results) => {
        debugFindAllBooksRequest('End');
    })
    .catch((e) => {
        debugError(e);
    });
