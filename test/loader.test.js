import compiler from './compiler'

describe('loader tests', () => {
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
    const output = stats.toJson().modules[0].source

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
    const output = stats.toJson().modules[0].source

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
    const output = stats.toJson().modules[0].source

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
    const output = stats.toJson().modules[0].source

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
    const output = stats.toJson().modules[0].source

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
    const output = stats.toJson().modules[0].source

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
    const output = stats.toJson().modules[0].source

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
    const output = stats.toJson().modules[0].source

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
    const output = stats.toJson().modules[0].source

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
    const output = stats.toJson().modules[0].source

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
    const output = stats.toJson().modules[0].source

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
    const output = stats.toJson().modules[0].source

    expect(output).toContain('/dir/assets/')
  })
})
