import { isUrl } from '../src/utils'

describe('isUrl function', () => {
  const correctUrls = [
    'https://tensai.com/image.jpg',
    'http://tensai.jp/image.jpg',
    '/assets/dir/image.jpg',
    './assets/dir/image.jpg',
    '../assets/dir/image.jpg',
    'assets/dir/image.jpg',
    '/assets/dir/',
    './assets/dir/',
    '../assets/dir/',
    'assets/dir/',
    '/assets/dir',
    './assets/dir',
    '../assets/dir',
    'assets/dir',
    '/image.jpg',
    './image.jpg',
    '../image.jpg',
    'image.jpg',
    '/image',
    './image',
    '../image',
    'image',
    '12345',
  ]
  const wrongUrls = [undefined, null, '', 12345, '\\images', '*images', ';images', ':images', '<images', '>images']

  test('should return true when a url is correct', () => {
    correctUrls.forEach((url) => {
      expect(isUrl(url)).toBe(true)
    })
  })

  test('should return false when a url is worng', () => {
    wrongUrls.forEach((url) => {
      expect(isUrl(url)).toBe(false)
    })
  })
})
