# css-url-loader [![NPM version][npm-image]][npm-url] [![Dependency Status][depstat-image]][depstat-url]

Webpack loader to transform URLs to other URLs on CSS.

## Description

Transform URLs to new URLs in `url()` on your CSS. You can change a relative url
to an absolute url, or you can change an old url to an new url that you want.

## Install

```bash
yarn add --dev css-url-loader
```

## Usage

First, if you want to trasform `url(/assets/...)` to
`url(https://domain/assets/...)`, the `webpack.config.js` is below.

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

Next, if you want to trasform `url(/assets/...)` to `url(/dir/assets/...)`, the
`webpack.config.js` is below.

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

## Options

| Option | Description                    | Must? |
| ------ | :----------------------------- | :---: |
| from   | original url in url()          |   Y   |
| to     | transformed url                |   Y   |
| env    | execute when only 'production' |   N   |

[npm-url]: https://npmjs.org/package/css-url-loader
[npm-image]: https://badge.fury.io/js/css-url-loader.svg
[depstat-url]: https://david-dm.org/keidrun/css-url-loader
[depstat-image]: https://david-dm.org/keidrun/css-url-loader.svg
