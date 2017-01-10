'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var addArray = function addArray(arr) {
    var result = arr.reduce(function (a, b) {
        return a + b;
    }, 0);

    return result;
};
function isNum(num) {
    if (typeof num === 'number') {
        return true;
    } else {
        return false;
    }
}
var result2 = addArray([1, 2, 3, 4]);

exports.isNum = isNum;
//# sourceMappingURL=bundle.js.map
