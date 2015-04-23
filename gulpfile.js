
var gulp = require('gulp'),
    requireDir = require('require-dir')
    ,
    plugins = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'gulp.*'],
        scope: ['dependencies', 'devDependencies', 'peerDependencies'],
        replaceString: /\bgulp[\-.]/
    }),

// Require all tasks in gulp/tasks, including subfolders
    tasks = requireDir('./gulp/tasks', {recurse: true});

// assign the plugins to the `cached response`
gulp.plugins = plugins;