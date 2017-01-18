module.exports = (wallaby) => {
    process.env.NODE_ENV = 'test';
    // View test statistics (for locally running wallaby): http://wallabyjs.com/app/#/tests
    return {

        env: {
            // to specify system wide node as test runner, e.g. node 6 instead of node 4 from wallaby
            // add "runner: '/usr/local/bin/node'" containing the correct path to your node
            type: 'node'
        },

        files: [
            { pattern: 'src/**/*.ts' },
            { pattern: 'test/**/*.ts' },
            { pattern: '!src/index.ts' },
            { pattern: '!src/**/*.d.ts' },
            { pattern: '!test/**/*.spec.ts' }
        ],

        tests: [
            { pattern: 'test/**/*.spec.ts' }
        ],

        debug: true,

        testFramework: 'jasmine',

        compilers: {
            '**/*.ts': wallaby.compilers.typeScript({
                typescript: require('typescript'),
                module: 'commonjs'
            })
        },

        workers: {
            recycle: true,
            initial: 1,
            regular: 1
        }

    };
};
