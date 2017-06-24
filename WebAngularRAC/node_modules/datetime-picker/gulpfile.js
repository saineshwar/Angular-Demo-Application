var _         = require('lodash'),
  eventStream = require('event-stream'),
  pkg         = require('./package.json'),
  gulp        = require('gulp'),
  concat      = require('gulp-concat'),
  wrap        = require('gulp-wrap'),
  sass        = require('gulp-sass'),
  webserver   = require('gulp-webserver');

var compileTemplate = function() {
  var transform = function(file, cb) {
    var name     = file.relative.replace(/\.html$/, '');
    var contents = file.contents.toString()
      .replace(/\"/g, '\\"')
      .replace(/\n/g, '');

    var content = 'templates["'+name+'"] = "'+contents+'";';

    file.contents = new Buffer(String(content));
    cb(null, file);
  };

  return eventStream.map(transform);
};

gulp.task('default', ['build', 'sass', 'watch', 'server']);

gulp.task('watch', function() {
  gulp.watch(['src/*', 'package.json'], ['build']);
  gulp.watch('example/*.scss', ['sass']);
});

gulp.task('sass', function() {
  gulp.src('example/*.scss')
    .pipe(sass({
      includePaths: ['bower_components']
    }))
    .pipe(gulp.dest('.tmp/'));
});

gulp.task('templates', function(){
  return gulp.src('src/*.html')
    .pipe(compileTemplate())
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('.tmp'));
});

gulp.task('build', ['templates'], function() {
  gulp.src([
    'src/picker.js',
    'src/events.js',
    'src/display.js',
    'src/helpers.js',
    'src/calendar.js',
    'src/plugin.js',
    'src/bind.js',
    '.tmp/templates.js'
  ])
  .pipe(concat('datepicker.js'))
  .pipe(wrap({
    src: 'src/wrapper.js',
  },
  {
    version: pkg.version
  }))
  .pipe(gulp.dest('dist/'));
});

gulp.task('server', function() {
  gulp.src('.')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});
