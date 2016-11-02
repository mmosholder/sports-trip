var config       = require('../config')
if(!config.tasks.html) return

var browserSync  = require('browser-sync')
var data         = require('gulp-data')
var gulp         = require('gulp')
var gulpif       = require('gulp-if')
var handleErrors = require('../lib/handleErrors')
var htmlmin      = require('gulp-htmlmin')
var path         = require('path')
var render       = require('gulp-nunjucks-render')
var fs           = require('fs')
var $            = require('gulp-load-plugins')();

var paths = {
  src: [path.join(config.root.src, config.tasks.html.src, '/**/*.{' + config.tasks.html.extensions + '}')],
  dest: path.join(config.root.dest, config.tasks.html.dest),
  prod: path.join(config.root.prod, config.tasks.fonts.prod)
}

var getData = function(file) {
  var dataPath = path.resolve(config.root.src, config.tasks.html.src, config.tasks.html.dataFile)
  return JSON.parse(fs.readFileSync(dataPath, 'utf8'))
}

var htmlTask = function() {

  return gulp.src(paths.src)
    .pipe($.plumber())
      .pipe($.pug({
        'pretty': true
        }))
    .on('error', handleErrors)
    .pipe(gulpif(global.production, htmlmin(config.tasks.html.htmlmin)))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())

}

gulp.task('html', htmlTask)
module.exports = htmlTask
