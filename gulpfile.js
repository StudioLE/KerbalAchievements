// Core modules
var p = require('path')
var ver = require('./package.json').version

// Node modules
var gulp = require('gulp')
var gp_bump = require('gulp-bump')
var gp_clean = require('gulp-clean')
var gp_html = require('gulp-html-replace')
var gp_concat = require('gulp-concat')
var gp_rename = require('gulp-rename')
var gp_uglify = require('gulp-uglify')
var gp_minify = require('gulp-minify-css')
var gp_less = require('gulp-less')

/**
 * Format build directory path
 */
function build_path(path) {
  if( ! path) path = ''
  return p.join('build', path)
}

/**
 * Format version query string
 */
function v() {
  return '?v' + ver
}

// Bump version
gulp.task('bump', function(){
  gulp.src(['./bower.json', './package.json'])
  .pipe(gp_bump({
    type:'prerelease'
  }))
  .pipe(gulp.dest('./'))
})

// Clean build directory
 gulp.task('clean', function () {
  return gulp.src('build', {
    // read: false
  })
  .pipe(gp_clean())
})

// Build index.html
gulp.task('index', function() {
  gulp.src('src/index.html')
  .pipe(gp_html({
    'css': 'css/app.css' + v(),
    'vendor-css': 'css/vendor.css' + v(),
    'js': 'js/app.js' + v(),
    'vendor-js': 'js/vendor.js' + v()
  }))
  .pipe(gulp.dest(build_path()))
})

// Copy static assets
gulp.task('assets', function() {
  // Top level
  gulp.src([
    'src/humans.txt',
    'src/favicon.ico'
  ])
  .pipe(gulp.dest(build_path()))
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

// Build app CSS
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

// Build vendor CSS
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

// Build app JS
gulp.task('js', function() {
  gulp.src([
    'src/app.js',
    'src/config.js',
    'src/controllers/*.js',
    'src/factories/*.js'
  ])
  .pipe(gp_concat('concat.js'))
  .pipe(gp_rename('app.js'))
  // .pipe(gp_uglify())
  .pipe(gulp.dest(build_path('js')))
})

// Build vendor JS
gulp.task('vendor-js', function() {
  gulp.src([
    'src/bower_components/jquery/dist/jquery.min.js',
    'src/bower_components/bootstrap/dist/js/bootstrap.min.js',
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

// Build published/index.html
gulp.task('published', function() {
  // Published index.html
  gulp.src('src/published/index.html')
  .pipe(gp_html({
    'css': '/css/app.css' + v(),
    'vendor-css': '/css/published-vendor.css' + v(),
    'vendor-js': '/js/published-vendor.js' + v()
  }))
  .pipe(gulp.dest(build_path('published')))
  // Published vendor CSS
  gulp.src([
    'src/bower_components/bootstrap/dist/css/bootstrap.min.css',
    'src/bower_components/moe-font-opensans/fonts.min.css',
    'src/bower_components/TimelineJS3/compiled/css/timeline.css'
  ])
  .pipe(gp_concat('concat.js'))
  .pipe(gp_rename('published-vendor.css'))
  .pipe(gp_minify({keepSpecialComments: 0}))
  .pipe(gulp.dest(build_path('css')))
  // Published vendor JS
  gulp.src([
    'src/bower_components/jquery/dist/jquery.min.js',
    'src/bower_components/TimelineJS3/compiled/js/timeline.js'
    ])
  .pipe(gp_concat('concat.js'))
  .pipe(gp_rename('published-vendor.js'))
  .pipe(gp_uglify())
  .pipe(gulp.dest(build_path('js')))
  // Copy JSON
  gulp.src('src/published/json/*')
  .pipe(gulp.dest(build_path('published/json')))
})

// Run build tasks by default
gulp.task('build', ['index', 'assets', 'css', 'vendor-css', 'js', 'vendor-js', 'published'])

// Default task
gulp.task('default', ['build'])
