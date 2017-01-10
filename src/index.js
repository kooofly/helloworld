import { cube } from '../thirdparts/index1'

const addArray = arr => {
    const result = arr.reduce((a, b) => a + b, 0);

    return result;
};
export function isNum(num) {
    if (typeof num === 'number') {
        return true
    } else {
        return false
    }
}
const result2 = addArray([1, 2, 3, 4]);