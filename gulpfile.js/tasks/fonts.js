var config      = require('../config')
if(!config.tasks.fonts) return

var browserSync = require('browser-sync')
var changed     = require('gulp-changed')
var gulp        = require('gulp')
var gulpif      = require('gulp-if')

var path        = require('path')

var paths = {
  src: path.join(config.root.src, config.tasks.fonts.src, '/**/*.{' + config.tasks.fonts.extensions + '}'),
  dest: path.join(config.root.dest, config.tasks.fonts.dest),
  prod: path.join(config.root.prod, config.tasks.fonts.prod)
}

var fontsTask = function() {
  return gulp.src([paths.src, '*!README.md'])
    .pipe(changed(paths.dest)) // Ignore unchanged files
    .pipe(gulpif(!global.production, gulp.dest(paths.dest)))
    .pipe(gulpif(global.production, gulp.dest(paths.prod)))
    .pipe(browserSync.stream())
}

gulp.task('fonts', fontsTask)
module.exports = fontsTask
