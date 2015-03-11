
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var vulcanize = require('gulp-vulcanize');

gulp.task('jshint', function() {
  return gulp.src('./src/*.js')
    .pipe(jshint({
      lookup: true
    }))
    .pipe(jshint.reporter(stylish));
});

//gulp.task('vulcanize', function () {
//  var DIST = 'dist';
//
//  return gulp.src('./src/hot-table.html')
//    .pipe(vulcanize({
//      dest: DIST,
//      strip: true,
//      inline: true,
//      excludes: {
//        scripts: ['handsontable.*', 'polymer.js'],
//        styles: ['handsontable.*']
//      }
//    }))
//    .pipe(gulp.dest(DIST));
//});

gulp.task('default', ['jshint']);
