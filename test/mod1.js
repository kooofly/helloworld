const Util = require('../src/modules/mod1')
describe('mod1.js: ', () => {
    it('isNum() should work fine.', () => {
        expect(Util.isNum(1)).toBe(true)
        expect(Util.isNum('1')).toBe(false)
    })
    it('cube2() should work fine.', () => {
        expect(Util.cube2(1)).toBe(1)
        expect(Util.cube2(2)).toBe(8)
    })
})