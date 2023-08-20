const {JSDOM} = require('jsdom')

function getURLs(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkElement of linkElements) {
        if (linkElement.href.slice(0, 1) === '/') {
            //relative URL
            try {
                const urlString = new URL(`${baseURL}${linkElement.href}`)
                urls.push(urlString.href)
            } catch (err) {
                console.error('error with relative URL: ', err.message)
            }
        } else {
            try {
                //checks for absolute url
                const urlString = new URL(linkElement.href)
                urls.push(urlString.href)
            } catch (err) {
                console.error('error with absolute URL: ', err.message)
            }
        }
    }
    return urls
}

function normalizeURL(urlString) {
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1)
    }
    return hostPath
}

module.exports = {
    normalizeURL,
    getURLs
}