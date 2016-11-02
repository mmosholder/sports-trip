var config      = require('../config')
if(!config.tasks.images) return

var browserSync = require('browser-sync')
var changed     = require('gulp-changed')
var gulp        = require('gulp')
var gulpif      = require('gulp-if')
var imagemin    = require('gulp-imagemin')
var path        = require('path')

var paths = {
  src: path.join(config.root.src, config.tasks.images.src, '/**/*.{' + config.tasks.images.extensions + '}'),
  dest: path.join(config.root.dest, config.tasks.images.dest),
  prod: path.join(config.root.prod, config.tasks.images.prod)
}

var imagesTask = function() {
  return gulp.src([paths.src, , '*!README.md'])
    .pipe(changed(paths.dest)) // Ignore unchanged files
    // .pipe(imagemin()) // Optimize
    .pipe(gulpif(!global.production, gulp.dest(paths.dest)))
    .pipe(gulpif(global.production, gulp.dest(paths.prod)))
    .pipe(browserSync.stream())
}

gulp.task('images', imagesTask)
module.exports = imagesTask
