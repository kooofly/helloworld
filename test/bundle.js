const bundle = require('../dist/bundle')

describe('bundle.js: ', () => {
    it('isNum() should work fine.', () => {
        expect(bundle.isNum(1)).toBe(true)
        expect(bundle.isNum('1')).toBe(false)
    })
})
