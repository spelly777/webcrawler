const {normalizeURL} = require('./crawl.js')
const {test, expect} = require('@jest/globals')




test('normalizeURL delete https://', () => {
    const input = 'https://blog.boot.dev/path'
    const actualOutput = normalizeURL(input)
    const expectedOutput = 'blog.boot.dev/path'

    //Ensures that URL will have normal beginning
    expect(actualOutput).toEqual(expectedOutput)
})

test('normalizeURL delete trailiing /', () => {
    const input = 'https://blog.boot.dev/path/'
    const actualOutput = normalizeURL(input)
    const expectedOutput = 'blog.boot.dev/path'

    //Ensures that the URL will not end with '/'
    expect(actualOutput).toEqual(expectedOutput)
})

test('normalizeURL capitals', () => {
    const input = 'https://BLOG.boot.dev/path/'
    const actualOutput = normalizeURL(input)
    const expectedOutput = 'blog.boot.dev/path'

    //Ensures that the URL will not end with '/'
    expect(actualOutput).toEqual(expectedOutput)
})

test('normalizeURL delete http', () => {
    const input = 'https://blog.boot.dev/path/'
    const actualOutput = normalizeURL(input)
    const expectedOutput = 'blog.boot.dev/path'

    //Ensures that the URL will not end with '/'
    expect(actualOutput).toEqual(expectedOutput)
})