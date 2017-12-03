# css-exact-url-loader [![NPM version][npm-image]][npm-url] [![Dependency Status][depstat-image]][depstat-url]

Webpack plugin to exact url on CSS.

## Description

Transform `url()` on your CSS.

## Install

```bash
yarn add --dev css-exact-url-loader
```

## Usage

A example of `webpack.config.js` is below.

```javascript
module.exports = {
  ...
  module: {
    rules: [
      ...
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'css-exact-url-loader',
              query: {
                from: '/assets/',
                to: 'https://domain/assets/'
              }
            }
          ],
        }),
      },
      ...
    ],
  },
  plugins: [
    ...
    new ExtractTextPlugin('bundle.css'),
    ...
  ],
```

Other example of `webpack.config.js` is below.

```javascript
module.exports = {
  ...
  module: {
    rules: [
      ...
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'css-exact-url-loader',
              query: {
                from: '/assets/',
                to: '/dir/assets/'
              }
            }
          ],
        }),
      },
      ...
    ],
  },
  plugins: [
    ...
    new ExtractTextPlugin('bundle.css'),
    ...
  ],
```

[npm-url]: https://npmjs.org/package/css-exact-url-loader
[npm-image]: https://badge.fury.io/js/css-exact-url-loader.svg
[depstat-url]: https://david-dm.org/keidrun/css-exact-url-loader
[depstat-image]: https://david-dm.org/keidrun/css-exact-url-loader.svg
