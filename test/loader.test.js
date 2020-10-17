import compiler from './compiler'

describe('loader', () => {
  afterEach(() => {
    process.env.NODE_ENV = undefined
    process.env.WEBPACK_MODE = undefined
  })

  test('should transform relative url to absolute url with production env', async () => {
    const fixture = 'entry1.css'
    const options = {
      from: '/assets/',
      to: 'https://domain/assets/',
      env: 'production',
    }
    process.env.NODE_ENV = 'production'
    // process.env.WEBPACK_MODE = 'production'

    const stats = await compiler(fixture, options)
    const output = stats.toJson({ source: true }).modules[0].source

    expect(output).toContain('https://domain/assets/')
  })

  test('should transform relative url to absolute url with production mode', async () => {
    const fixture = 'entry1.css'
    const options = {
      from: '/assets/',
      to: 'https://domain/assets/',
      mode: 'production',
    }
    // process.env.NODE_ENV = 'production'
    process.env.WEBPACK_MODE = 'production'

    const stats = await compiler(fixture, options)
    const output = stats.toJson({ source: true }).modules[0].source

    expect(output).toContain('https://domain/assets/')
  })

  test('should transform relative url to absolute url with single quot with production env', async () => {
    const fixture = 'entry2.css'
    const options = {
      from: '/assets/',
      to: 'https://domain/assets/',
    }
    process.env.NODE_ENV = 'production'
    // process.env.WEBPACK_MODE = 'production'

    const stats = await compiler(fixture, options)
    const output = stats.toJson({ source: true }).modules[0].source

    expect(output).toContain("'https://domain/assets/")
  })

  test('should transform relative url to absolute url with single quot with production mode', async () => {
    const fixture = 'entry2.css'
    const options = {
      from: '/assets/',
      to: 'https://domain/assets/',
    }
    // process.env.NODE_ENV = 'production'
    process.env.WEBPACK_MODE = 'production'

    const stats = await compiler(fixture, options)
    const output = stats.toJson({ source: true }).modules[0].source

    expect(output).toContain("'https://domain/assets/")
  })

  test('should transform old url to new url with production env', async () => {
    const fixture = 'entry3.css'
    const options = {
      from: '/assets/',
      to: '/dir/assets/',
      env: '',
    }
    process.env.NODE_ENV = 'production'
    // process.env.WEBPACK_MODE = 'production'

    const stats = await compiler(fixture, options)
    const output = stats.toJson({ source: true }).modules[0].source

    expect(output).toContain('/dir/assets/')
  })

  test('should transform old url to new url with production mode', async () => {
    const fixture = 'entry3.css'
    const options = {
      from: '/assets/',
      to: '/dir/assets/',
      mode: '',
    }
    // process.env.NODE_ENV = 'production'
    process.env.WEBPACK_MODE = 'production'

    const stats = await compiler(fixture, options)
    const output = stats.toJson({ source: true }).modules[0].source

    expect(output).toContain('/dir/assets/')
  })

  test('should transform old url to new url with single quot with production env', async () => {
    const fixture = 'entry4.css'
    const options = {
      from: '/assets/',
      to: '/dir/assets/',
    }
    process.env.NODE_ENV = 'production'
    // process.env.WEBPACK_MODE = 'production'

    const stats = await compiler(fixture, options)
    const output = stats.toJson({ source: true }).modules[0].source

    expect(output).toContain("'/dir/assets/")
  })

  test('should transform old url to new url with single quot with production mode', async () => {
    const fixture = 'entry4.css'
    const options = {
      from: '/assets/',
      to: '/dir/assets/',
    }
    // process.env.NODE_ENV = 'production'
    process.env.WEBPACK_MODE = 'production'

    const stats = await compiler(fixture, options)
    const output = stats.toJson({ source: true }).modules[0].source

    expect(output).toContain("'/dir/assets/")
  })

  test('should transform old url to new url with development env', async () => {
    const fixture = 'entry1.css'
    const options = {
      from: '/assets/',
      to: '/dir/assets/',
      env: 'development',
    }
    process.env.NODE_ENV = 'development'
    // process.env.WEBPACK_MODE = 'development'

    const stats = await compiler(fixture, options)
    const output = stats.toJson({ source: true }).modules[0].source

    expect(output).toContain('/dir/assets/')
  })

  test('should transform old url to new url with development mode', async () => {
    const fixture = 'entry1.css'
    const options = {
      from: '/assets/',
      to: '/dir/assets/',
      mode: 'development',
    }
    // process.env.NODE_ENV = 'development'
    process.env.WEBPACK_MODE = 'development'

    const stats = await compiler(fixture, options)
    const output = stats.toJson({ source: true }).modules[0].source

    expect(output).toContain('/dir/assets/')
  })

  test('should transform old url to new url with both development env and development mode', async () => {
    const fixture = 'entry4.css'
    const options = {
      from: '/assets/',
      to: '/dir/assets/',
      env: 'development',
    }
    process.env.NODE_ENV = 'development'
    process.env.WEBPACK_MODE = 'development'

    const stats = await compiler(fixture, options)
    const output = stats.toJson({ source: true }).modules[0].source

    expect(output).toContain('/dir/assets/')
  })

  test('should transform old url to new url with single quot with both development env and development mode', async () => {
    const fixture = 'entry4.css'
    const options = {
      from: '/assets/',
      to: '/dir/assets/',
      mode: 'development',
    }
    process.env.NODE_ENV = 'development'
    process.env.WEBPACK_MODE = 'development'

    const stats = await compiler(fixture, options)
    const output = stats.toJson({ source: true }).modules[0].source

    expect(output).toContain('/dir/assets/')
  })

  test('should transform old url to new url when urls use double quotes', async () => {
    const fixture = 'entry5.css'
    const options = {
      from: '/assets/',
      to: '/dir/assets/',
    }
    process.env.NODE_ENV = 'production'
    // process.env.WEBPACK_MODE = 'production'

    const stats = await compiler(fixture, options)
    const output = stats.toJson({ source: true }).modules[0].source

    expect(output).toContain('/dir/assets/')
  })

  test('should not transform urls when both env and mode are undefined', async () => {
    const fixture = 'entry3.css'
    const options = {
      from: '/assets/',
      to: '/dir/images/',
    }
    process.env.NODE_ENV = undefined
    process.env.WEBPACK_MODE = undefined

    const stats = await compiler(fixture, options)
    const output = stats.toJson({ source: true }).modules[0].source

    expect(output).toContain('/assets/')
    expect(output).not.toContain('/dir/images/')
  })

  test('should not transform urls when env is not production', async () => {
    const fixture = 'entry3.css'
    const options = {
      from: '/assets/',
      to: '/dir/images/',
    }
    process.env.NODE_ENV = 'development'
    // process.env.WEBPACK_MODE = 'development'

    const stats = await compiler(fixture, options)
    const output = stats.toJson({ source: true }).modules[0].source

    expect(output).toContain('/assets/')
    expect(output).not.toContain('/dir/images/')
  })

  test('should not transform urls when mode is not production', async () => {
    const fixture = 'entry3.css'
    const options = {
      from: '/assets/',
      to: '/dir/images/',
    }
    // process.env.NODE_ENV = 'development'
    process.env.WEBPACK_MODE = 'development'

    const stats = await compiler(fixture, options)
    const output = stats.toJson({ source: true }).modules[0].source

    expect(output).toContain('/assets/')
    expect(output).not.toContain('/dir/images/')
  })

  test('should throw error when both from and to options are empty', async () => {
    const fixture = 'entry3.css'
    const options = {
      from: '',
      to: '',
    }
    process.env.NODE_ENV = 'production'
    // process.env.WEBPACK_MODE = 'production'

    return expect(compiler(fixture, options)).rejects.toContain("Must set 'from' and 'to' options!")
  })

  test('should throw error when a from is not url', async () => {
    const fixture = 'entry3.css'
    const options = {
      from: '*.jpg',
      to: '/images/image.jpg',
    }
    process.env.NODE_ENV = 'production'
    // process.env.WEBPACK_MODE = 'production'

    return expect(compiler(fixture, options)).rejects.toContain('Cannot transform *.jpg to /images/image.jpg!')
  })
})
