'use strict';

const gulp = require('gulp');
const path = require('path');
const paths = require('../paths');
const util = require('../util');
const $ = require('gulp-load-plugins')({
    lazy: true
});

gulp.task('lint', [
    'lint:src',
    'lint:test'
]);

gulp.task('lint:src', () => linter(paths.src));
gulp.task('lint:test', () => linter(paths.test));

function linter(filePath) {
    return gulp
        .src(['./typings/main.d.ts', path.join(filePath, '/**/*.ts')])
        .pipe($.tslint({
            emitError: false,
            formatter: 'verbose'
        }))
        .pipe($.tslint.report())
        .on('error', function() {
            util.notify('TSLINT failed!');
        });
}
