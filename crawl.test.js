const {normalizeURL, getURLs} = require('./crawl.js')
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

test('Get absolute URLS from HTML', () => {
    const inputHTMLBody = `
<html> 
     <body> 
        <h1>Hello!</h1>
        <a href = "https://blog.boot.dev/path/">
            My Website
        </a>
    </body>
</html> `
    const baseURL = "https://blog.boot.dev/path/"
    const actualOutput = getURLs(inputHTMLBody, baseURL)
    const expectedOutput = ['https://blog.boot.dev/path/']


    expect(actualOutput).toEqual(expectedOutput)
})

test('Get relative URLs from HTML', () => {
    const inputHTMLBody = `
<html> 
    <body> 
       <h1>Hello!</h1>
       <a href = "/path/">
           My Website
       </a>
   </body>
</html> `
    const baseURL = "https://blog.boot.dev"
    const actualOutput = getURLs(inputHTMLBody, baseURL)
    const expectedOutput = ['https://blog.boot.dev/path/']
    expect(actualOutput).toEqual(expectedOutput)
})

test('Get multiple URLs from HTML', () => {
    const inputHTMLBody = `
<html> 
    <body> 
       <h1>Hello!</h1>
       <a href = "https://blog.boot.dev/path1/">
           My Website
       </a>
       <a href = "/path2/"> Will Spellman </a>
   </body>
</html> `
    const baseURL = "https://blog.boot.dev"
    const actualOutput = getURLs(inputHTMLBody, baseURL)
    const expectedOutput = ['https://blog.boot.dev/path1/', 'https://blog.boot.dev/path2/']
    expect(actualOutput).toEqual(expectedOutput)
})

test('Doesnt take invalid URLs', () => {
    const inputHTMLBody = `
<html> 
    <body> 
       <h1>Hello!</h1>
       <a href = "blahblahblah">
           This URL is invalid.
       </a>
   </body>
</html> `
    const baseURL = "https://blog.boot.dev"
    const actualOutput = getURLs(inputHTMLBody, baseURL)
    const expectedOutput = []
    expect(actualOutput).toEqual(expectedOutput)
})