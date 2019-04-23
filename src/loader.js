import { getOptions } from 'loader-utils'
import validateOptions from 'schema-utils'
import { isUrl } from './utils'

function processSource(source, options = {}) {
  const fromURL = options.from
  const toURL = options.to
  const mode = options.mode || 'production'
  const env = options.env || 'production'
  const NODE_ENV = (process.env && process.env.NODE_ENV) || ''
  const WEBPACK_MODE = (process.env && process.env.WEBPACK_MODE) || ''

  if (!fromURL || !toURL) {
    throw new Error(`Must set 'from' and 'to' options!`)
  } else if (!isUrl(fromURL) || !isUrl(toURL)) {
    throw new Error(`Cannot transform ${options.from} to ${options.to}!`)
  }

  if (NODE_ENV === env || WEBPACK_MODE === mode) {
    const regex = new RegExp(`url\\(\\s*${fromURL.replace(/\//g, '\\/')}`, 'g')
    const regexWithSingleQuotes = new RegExp(`url\\(\\s*'${fromURL.replace(/\//g, '\\/')}`, 'g')
    const regexWithDoubleQuotes = new RegExp(`url\\(\\s*"${fromURL.replace(/\//g, '\\/')}`, 'g')

    return source
      .replace(regex, `url(${toURL}`)
      .replace(regexWithSingleQuotes, `url('${toURL}`)
      .replace(regexWithDoubleQuotes, `url("${toURL}`)
  }
  return source
}

const schema = {
  type: 'object',
  properties: {
    from: {
      type: 'string',
    },
    to: {
      type: 'string',
    },
    mode: {
      type: 'string',
    },
    env: {
      type: 'string',
    },
  },
}

export default function loader(source) {
  const options = getOptions(this)
  validateOptions(schema, options, 'css-url-loader')

  const processedSource = processSource(source, options)

  return processedSource
}
