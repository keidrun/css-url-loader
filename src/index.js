const loaderUtils = require('loader-utils');
const { URL } = require('url');

const isURLInstance = str => {
  try {
    new URL(str);
    return true;
  } catch (err) {
    return false;
  }
};
const isURL = str => {
  if (
    isURLInstance(str) ||
    isURLInstance('http:/' + str) ||
    isURLInstance('http://' + str) ||
    isURLInstance('http:/' + str.replace('./', '/'))
  ) {
    return true;
  } else {
    return false;
  }
};

function processOptions(source, options) {
  const fromURL = options.from;
  const toURL = options.to;
  const env = options.env || 'production';
  const NODE_ENV = process.env.NODE_ENV || 'production'

  if (NODE_ENV !== env) {
    return source;
  }

  if (!isURL(fromURL) || !isURL(toURL)) {
    throw new Error(
      'Cannot transform ' + options.from + ' to ' + options.to + '!'
    );
  }

  const escapedFromURL = fromURL.replace(/\//g, '\\/');
  const newSource = source
    .replace(new RegExp('url\\(\\s*' + escapedFromURL, 'g'), 'url(' + toURL)
    .replace(new RegExp("url\\(\\s*'" + escapedFromURL, 'g'), "url('" + toURL)
    .replace(new RegExp('url\\(\\s*"' + escapedFromURL, 'g'), 'url("' + toURL);

  return newSource;
}

module.exports = function(source, map) {
  this.cacheable();

  const options = loaderUtils.getOptions(this);
  source = processOptions(source, options);

  this.callback(null, source, map);
};
