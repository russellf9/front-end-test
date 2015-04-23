'use strict';

var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    config = require('../../config'),
    path = require('path'),
    streamqueue = require('streamqueue');

// performs operations to distribute the css files
gulp.task('styles', function() {

    var options = config.sass.options;

    options.style = 'expanded';

    var sassStream = gulp.plugins.rubySass(config.sass.rubySrc, options)
            .pipe(gulp.plugins.autoprefixer(config.sass.autoprefixer))
            .on('error', errorHandler),
        targetDir = path.resolve('./public');

    return streamqueue({objectMode: true}, sassStream)
        .pipe(gulp.plugins.concat('main.css'))
        .pipe(gulp.dest(path.join(targetDir, 'styles')))
        .on('error', errorHandler)
        .pipe(gulp.plugins.notify({
            title: 'SASS',
            message: 'SASS completed.  New CSS created!',
            sound: 'Pop'
        }));
});


// Handle errors
function errorHandler(error) {
    console.log('Gulp Styles Error: ', error.toString());
    /*jshint validthis:true */
    this.emit('end');
}

