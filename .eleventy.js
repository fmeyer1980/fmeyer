const blocksToHtml = require('@sanity/block-content-to-html')
const urlFor = require('./utils/imageUrl');
const serializers = require('./utils/serializers.js');

const svgContents = require("eleventy-plugin-svg-contents");
const htmlMinTransform = require("./src/_transforms/html-min-transform.js");

const eleventyReadMorePlugin = require("eleventy-plugin-read-more");

const isProduction = process.env.NODE_ENV === "production";

module.exports = function (config) {

  if (isProduction) {
    config.addTransform('htmlmin', htmlMinTransform);
  }

  config.addPassthroughCopy({ "src/_assets/fonts": "fonts" });
  config.addPassthroughCopy({ "src/_assets/images": "images" });
  config.addPassthroughCopy({ "./src/_assets/js/main.js": "./js/main.js" });
  config.addPassthroughCopy("favicon.svg");

  config.addPlugin(svgContents);

  config.addPlugin(eleventyReadMorePlugin);

  config.addFilter('slug', function (str) {
    return str
      .toLowerCase()
      .replace(/ /g, '-')
      .replace( /ø/g, 'oe' )
      .replace( /å/g, 'aa' )
      .replace(/[^\w-]+/g, '');
  });

  config.addFilter('sanityBlock', function(value) {
    return blocksToHtml({
      blocks: value,
      serializers: serializers,
      className: "[ flow ]"
    })
  })

  config.addFilter('sanityBlockContent', function(value) {
    return blocksToHtml({
      blocks: value,
      serializers: serializers,
      className: "page-content [ flow ]"
    })
  })

  config.addShortcode('imageUrlForHeight', (image, height="100") => {
    return urlFor(image)
      .height(height)
      .auto('format')
      .quality('70')
  })

  config.addShortcode('imageUrlFor', (image, width="400") => {
    return urlFor(image)
      .width(width)
      .auto('format')
      .quality('70')
  })

  config.addShortcode('croppedUrlFor', (image,width,height) => {
    return urlFor(image)
      .width(width)
      .height(height)
      .auto('format')
      .quality('70')
  })

  return {
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
