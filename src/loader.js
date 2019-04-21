import { getOptions } from 'loader-utils'
import validateOptions from 'schema-utils'
import { URL } from 'url'

const isURLInstance = str => {
  try {
    // eslint-disable-next-line no-new
    new URL(str)
    return true
  } catch (err) {
    return false
  }
}
const isURL = str => {
  if (
    isURLInstance(str) ||
    isURLInstance(`http:/${str}`) ||
    isURLInstance(`http://${str}`) ||
    isURLInstance(`http:/${str.replace('./', '/')}`)
  ) {
    return true
  }
  return false
}

function processSource(source, options = {}) {
  const fromURL = options.from
  const toURL = options.to
  const mode = options.mode || 'production'
  const env = options.env || 'production'
  const NODE_ENV = (process.env && process.env.NODE_ENV) || ''
  const WEBPACK_MODE = (process.env && process.env.WEBPACK_MODE) || ''

  if (!fromURL || !toURL) {
    throw new Error(`Must set 'from' and 'to' options!`)
  } else if (!isURL(fromURL) || !isURL(toURL)) {
    throw new Error(`Cannot transform ${options.from} to ${options.to}!`)
  }

  if (NODE_ENV === env || WEBPACK_MODE === mode) {
    const escapedFromURL = fromURL.replace(/\//g, '\\/')
    const newSource = source
      .replace(new RegExp(`url\\(\\s*${escapedFromURL}`, 'g'), `url(${toURL}`)
      .replace(new RegExp(`url\\(\\s*'${escapedFromURL}`, 'g'), `url('${toURL}`)
      .replace(new RegExp(`url\\(\\s*"${escapedFromURL}`, 'g'), `url("${toURL}`)

    return newSource
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
