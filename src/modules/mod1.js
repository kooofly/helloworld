import { cube } from '../../thirdparts/index1'
export function isNum (num) {
    if (typeof num === 'number') {
        return true
    } else {
        return false
    }
}
export function cube2 (num) {
    return cube(num) * 1
}