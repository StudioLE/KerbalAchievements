var gulp = require('gulp')
var htmlreplace = require('gulp-html-replace')
var gp_concat = require('gulp-concat')
var gp_rename = require('gulp-rename')
var gp_uglify = require('gulp-uglify')
var gp_minify = require('gulp-minify-css')
var gp_less = require('gulp-less')
var p = require('path')

function build_path(path) {
  if( ! path) path = ''
  return p.join('build', path)
}

// Build index.html
gulp.task('index', function() {
  gulp.src('src/index.html')
    .pipe(htmlreplace({
      'css': 'css/app.css',
      'vendor-css': 'css/vendor.css',
      'js': 'js/app.js',
      'vendor-js': 'js/vendor.js'
    }))
    .pipe(gulp.dest(build_path()))
})

// Copy static assets
gulp.task('assets', function() {
  // Views
  gulp.src('src/views/*')
  .pipe(gulp.dest(build_path('views')))
  // Images
  gulp.src('src/img/*')
  .pipe(gulp.dest(build_path('img')))
  // Open Sans
  gulp.src('src/bower_components/moe-font-opensans/fonts/*')
  .pipe(gulp.dest(build_path('css/fonts')))
  // Font Awesome
  gulp.src('src/bower_components/font-awesome/fonts/*')
  .pipe(gulp.dest(build_path('fonts')))
  // TimelineJS
  gulp.src('src/bower_components/TimelineJS3/compiled/css/icons/*')
  .pipe(gulp.dest(build_path('css/icons')))
})

// Concat and minify CSS
gulp.task('css', function() {
  gulp.src('src/css/style.less')
  .pipe(gp_less({ paths: [
    'src/bower_components/bootstrap/less/mixins.less',
    'src/bower_components/bootstrap/less/variables.less'
  ]}))
  .pipe(gp_rename('app.css'))
  .pipe(gp_minify({keepSpecialComments: 0}))
  .pipe(gulp.dest(build_path('css')))
})

// Concat and minify vendor CSS
gulp.task('vendor-css', function() {
  gulp.src([
    'src/bower_components/bootstrap/dist/css/bootstrap.min.css',
    'src/bower_components/moe-font-opensans/fonts.min.css',
    'src/bower_components/font-awesome/css/font-awesome.min.css',
    'src/bower_components/json-formatter/dist/json-formatter.min.css',
    'src/bower_components/TimelineJS3/compiled/css/timeline.css'
  ])
  .pipe(gp_concat('concat.js'))
  .pipe(gp_rename('vendor.css'))
  .pipe(gp_minify({keepSpecialComments: 0}))
  .pipe(gulp.dest(build_path('css')))
})

// Concat and minify JS
gulp.task('js', function() {
  gulp.src(['src/app.js', 'src/config.js', 'src/controllers/*.js', 'src/factories/*.js'])
  .pipe(gp_concat('concat.js'))
  .pipe(gp_rename('app.js'))
  // .pipe(gp_uglify())
  .pipe(gulp.dest(build_path('js')))
})

// Concat and minify vendor JS
gulp.task('vendor-js', function() {
  gulp.src([
    'src/bower_components/jquery/dist/jquery.min.js',
    'src/bower_components/bootswatch-dist/js/bootstrap.min.js',
    'src/bower_components/lodash/lodash.min.js',
    'src/bower_components/angular/angular.min.js',
    'src/bower_components/angular-route/angular-route.min.js',
    'src/bower_components/angular-resource/angular-resource.min.js',
    'src/bower_components/angular-local-storage/dist/angular-local-storage.min.js',
    'src/bower_components/json-formatter/dist/json-formatter.min.js',
    'src/bower_components/TimelineJS3/compiled/js/timeline-min.js'
  ])
  .pipe(gp_concat('concat.js'))
  .pipe(gp_rename('vendor.js'))
  .pipe(gp_uglify())
  .pipe(gulp.dest(build_path('js')))
})

// Run build tasks by default
gulp.task('default', ['index', 'assets', 'css', 'vendor-css', 'js', 'vendor-js'], function(){

})
