const { sortPages } = require('./report.js')
const { test, expect } = require('@jest/globals')


test('sort pages 2 pages', () => {
    const input = {
        'https://wagslane.dev/path': 1,
        'https://wagslane.dev': 3
    }
    const actualOutput = sortPages(input)
    const expectedOutput = [
        ['https://wagslane.dev', 3],
        ['https://wagslane.dev/path', 1]

    ]

    //Ensures that URL will have normal beginning
    expect(actualOutput).toEqual(expectedOutput)
})

test('sort pages 5 pages', () => {
    const input = {
        'https://wagslane.dev/path': 1,
        'https://wagslane.dev': 3,
        'https://wagslane.dev/path2': 2,
        'https://wagslane.dev/path3': 7,
        'https://wagslane.dev/path4': 9
    }
    const actualOutput = sortPages(input)
    const expectedOutput = [
        ['https://wagslane.dev/path4', 9],
        ['https://wagslane.dev/path3', 7],
        ['https://wagslane.dev', 3],
        ['https://wagslane.dev/path2', 2],
        ['https://wagslane.dev/path', 1]

    ]

    //Ensures that URL will have normal beginning
    expect(actualOutput).toEqual(expectedOutput)
})