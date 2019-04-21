import path from 'path'
import webpack from 'webpack'
import Memoryfs from 'memory-fs'

export default (fixture, options = {}) => {
  const compiler = webpack({
    context: __dirname,
    entry: `./source/${fixture}`,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'css-loader',
            {
              loader: path.resolve(__dirname, '../src/loader.js'),
              options,
            },
          ],
        },
      ],
    },
  })

  compiler.outputFileSystem = new Memoryfs()

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err)
      if (stats.hasErrors()) reject(new Error(stats.toJson().errors))

      resolve(stats)
    })
  })
}
