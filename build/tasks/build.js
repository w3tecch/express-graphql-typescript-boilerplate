'use strict';

const gulp = require('gulp');
const path = require('path');
const runSequence = require('run-sequence');
const paths = require('../paths');
const util = require('../util');
const $ = require('gulp-load-plugins')({
    lazy: true
});

gulp.task('build', (callback) => runSequence(
    'lint',
    'clean',
    [
        'build:transpile:src',
        'build:transpile:test'
    ],
    callback
));

gulp.task('build:fast', (callback) => runSequence(
    'lint',
    'clean:build',
    [
        'build:transpile:src:fast',
        'build:transpile:test:fast'
    ],
    callback
));

gulp.task('build:transpile:src', () => transpiler(paths.root));
gulp.task('build:transpile:test', () => transpiler(paths.test, true));
gulp.task('build:transpile:src:fast', () => transpilerFast(paths.root));
gulp.task('build:transpile:test:fast', () => transpilerFast(paths.test, true));

const tsProjectSource = $.typescript.createProject('tsconfig.json', {
    'typescript': require('typescript')
});

const tsProjectTest = $.typescript.createProject('tsconfig.json', {
    'typescript': require('typescript')
});

function transpiler(filePath, isTest) {
    let tsProject = !!isTest ? tsProjectTest : tsProjectSource;
    return gulp
        .src(['./typings/main.d.ts', path.join(filePath, '/**/*.ts')])
        .pipe($.plumber({ errorHandler: $.notify.onError('Error: <%= error.message %>') }))
        .pipe($.sourcemaps.init({ loadMaps: true }))
        .pipe(tsProject())
        .pipe($.sourcemaps.write()) // inline sourcemaps
        .pipe(gulp.dest(filePath));
}

function transpilerFast(filePath, isTest) {
    let tsProject = isTest ? tsProjectTest : tsProjectSource;
    return gulp
        .src(['./typings/main.d.ts', path.join(filePath, '/**/*.ts')])
        .pipe($.cached('transpiling'))
        .pipe($.plumber({ errorHandler: $.notify.onError('Error: <%= error.message %>') }))
        .pipe($.changed(filePath, { extension: '.ts' }))
        .pipe($.sourcemaps.init({ loadMaps: true }))
        .pipe(tsProject())
        .pipe($.sourcemaps.write()) // inline sourcemaps
        .pipe(gulp.dest(filePath));
}
