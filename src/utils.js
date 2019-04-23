function isUrl(str) {
  return typeof str === 'string' && /^((https?:\/\/)|\.{0,2}\/)?[^(\s|\\|*|;|:|<|>)]+/.test(str)
}

export { isUrl } // eslint-disable-line import/prefer-default-export
