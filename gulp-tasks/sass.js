const { dest, src } = require('gulp');
const cleanCSS = require('gulp-clean-css');
const sassProcessor = require('gulp-sass')(require('sass'));
const purgecss = require('gulp-purgecss');

// We want to be using canonical Sass, rather than node-sass
sassProcessor.compiler = require('sass');

// Flags whether we compress the output etc
const isProduction = process.env.NODE_ENV === 'production';

// An array of outputs that should be sent over to includes
const criticalStyles = ['critical.scss', 'tokens.scss'];

// Takes the arguments passed by `dest` and determines where the output file goes
const calculateOutput = ({ history }) => {
  // By default, we want a CSS file in our dist directory, so the
  // HTML can grab it with a <link />
  let response = './dist/css';

  // Get everything after the last slash
  const sourceFileName = /[^/]*$/.exec(history[0])[0];

  // If this is critical CSS though, we want it to go
  // to the _includes directory, so nunjucks can include it
  // directly in a <style>
  if (criticalStyles.includes(sourceFileName)) {
    response = './src/_includes/css';
  }

  return response;
};

// The main Sass method grabs all root Sass files,
// processes them, then sends them to the output calculator
const sass = () => {
  return src('./src/_assets/scss/*.scss')
    .pipe(sassProcessor().on('error', sassProcessor.logError))
    .pipe(
      cleanCSS(
        isProduction
          ? {
            level: 2
          }
          : {}
      )
    )
    .pipe(dest(calculateOutput, { sourceMaps: !isProduction }));

};

// const tokens = () => {
//   return src('./src/_includes/css/tokens.css')
//     .pipe(
//       purgecss(
//         // isProduction ? 
//         {
//           content: ['./src/**/*.html'],
//           defaultExtractor: content => content.match(/[A-Za-z0-9-:/]+/g) || []
//         }
//         // : {}
//       )
//     )
//     .pipe(dest('./src/_includes/css/'));
// };


module.exports = sass;
// module.exports = tokens;