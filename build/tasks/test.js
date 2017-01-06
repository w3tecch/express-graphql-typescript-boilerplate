'use strict';

const gulp = require('gulp');
const path = require('path');
const runSequence = require('run-sequence');
const paths = require('../paths');
const util = require('../util');
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const $ = require('gulp-load-plugins')({
    lazy: true
});

gulp.task('test', (callback) => {
    runSequence(
        'build',
        'test:run',
        'clean',
        callback
    )
});

gulp.task('test:run', () =>
    gulp.src(['test/lib/setup.ts', path.join(path.join(paths.test, '**/*.spec.js'))], { read: true })
        .pipe($.jasmine({
            reporter: new SpecReporter()
        }))
);
