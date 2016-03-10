var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var connect = require('gulp-connect');
var run = require('run-sequence');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var LessPluginCleanCSS = require('less-plugin-clean-css');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var cleancss = new LessPluginCleanCSS({ advanced: true });
var autoprefix = new LessPluginAutoPrefix({ browsers: ["last 2 versions"] });

gulp.task('connect', function () {
  connect.server({
    root: 'public',
    livereload: true
  });
});

gulp.task('less', function () {
  return gulp.src('./assets/styles/styles.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'assets', 'styles') ],
      plugins: [autoprefix, cleancss]
    }))
    .pipe(gulp.dest('./public'))
    .pipe(connect.reload());
});

gulp.task('watch:less', function () {
  gulp.watch(['./assets/styles/*.less'], ['less']);
})

gulp.task('html', function () {
  return gulp.src('./public/**/*.html')
      .pipe(connect.reload());
})

gulp.task('watch:html', function () {
  gulp.watch(['./public/**/*.html'], ['html']);
})

gulp.task('build', function () {
    return browserify({entries: './assets/js/index.js', extensions: ['.jsx'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react', "stage-0"], plugins: ["babel-plugin-transform-decorators-legacy"]})
        .transform({
          global: true,
          sourcemap: false,
          ignore: [
            '**/node_modules/*',
            '**/assets/lib/*'
          ]
        }, 'uglifyify')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('public'))
        .pipe(connect.reload())
});

gulp.task('watch:js', function() {
  gulp.watch(['assets/**/*.js', 'assets/**/*.jsx'], ['build'])
});

gulp.task('watch:json', function() {
  gulp.watch(['assets/lib/*.json'], ['build'])
});


gulp.task('default', function () {
  run('connect', 'build', 'less', 'watch:html', 'watch:less', 'watch:js', 'watch:json');
})
