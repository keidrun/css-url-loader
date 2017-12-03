const loaderUtils = require('loader-utils');

// const isURLFunc = str => {
//   try {
//     new URL(str);
//     return true;
//   } catch (err) {
//     return false;
//   }
// };
// const isURL = str => {
//   if (
//     isURLFunc(str) ||
//     isURLFunc('http://' + str) ||
//     isURLFunc('http:/' + str.replace('./', ''))
//   ) {
//     return true;
//   } else {
//     return false;
//   }
// };

function processOptions(source, options) {
  const fromURL = options.from;
  const toURL = options.to;
  const isProduction = options.production || false;

  // if (!isURL(fromURL) || !isURL(toURL)) {
  //   throw new Error(
  //     'Cannot transform ' + options.from + ' to ' + options.to + '!'
  //   );
  // }

  const escapedFromURL = fromURL.replace(/\//g, '\\/');
  const newSource = source.replace(
    new RegExp('url\\(' + escapedFromURL, 'g'),
    'url(' + toURL
  );

  return newSource;
}

module.exports = function(source, map) {
  this.cacheable();

  const options = loaderUtils.getOptions(this);
  source = processOptions(source, options);

  this.callback(null, source, map);
};
