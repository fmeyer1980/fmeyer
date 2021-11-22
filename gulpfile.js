const { parallel, watch } = require("gulp");
const gulp = require('gulp');
const purgecss = require('gulp-purgecss');

// Pull in each task
const sass = require("./gulp-tasks/sass.js");

// Set each directory and contents that we want to watch and
// assign the relevant task. `ignoreInitial` set to true will
// prevent the task being run when we run `gulp watch`, but it
// will run when a file changes.
const watcher = () => {
  watch("./src/_assets/scss/**/*.scss", { ignoreInitial: true }, sass);
};

// The default (if someone just runs `gulp`) is to run each task in parrallel
exports.default = parallel(sass);

// This is our watcher task that instructs gulp to watch directories and
// act accordingly
exports.watch = watcher;

gulp.task('goron', function () {

  return gulp.src('./src/_includes/css/tokens.css')
    .pipe(purgecss({
      content: [
        './src/**/*.html'
      ],
      defaultExtractor: content => content.match(/[A-Za-z0-9-:/]+/g) || []
    }))
    .pipe(gulp.dest('./src/_includes/css/'));
});


gulp.task('build', gulp.parallel(
  'goron'
));