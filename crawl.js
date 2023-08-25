const {JSDOM} = require('jsdom')

async function crawlPage(baseURL, currentURL, pages) {

    const baseURLObject = new URL(baseURL)
    const currentURLObject = new URL(currentURL)

    if (baseURLObject.hostname !== currentURLObject.hostname) {
        return pages
    }

    const normalizedCurrentURL = normalizeURL(currentURL)

    // in case the page has already been crawled
    if (pages[normalizedCurrentURL] > 0) {
        
        //Increments # of times a URL is crawled to give the user this info
        pages[normalizedCurrentURL]++
        return pages
    }

    pages[normalizedCurrentURL] = 1

    console.log(`actively crawling: ${currentURL}`)

    try {
        const resp = await fetch(currentURL)

        if(resp.status > 399) {
            console.log('error in fetch with status code: ', resp.status, 'on page: ', currentURL)
            return pages
        }

        const contentType = resp.headers.get("content-type")
        if (!contentType.includes("text/html")) {
            console.log(`non html response, content type: `, contentType, 'on page: ', currentURL)
            return pages
        }

        const htmlBody = await resp.text()

        nextURLs = getURLs(htmlBody, baseURL)

        for (const nextURL of nextURLs) {
            pages = await crawlPage(baseURL, nextURL, pages)
        }
        return pages

    } catch (err) {
        console.error("error when fetching url: ", err.message, 'on page: ', currentURL)
    }
}

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
    getURLs,
    crawlPage
}