import { cube } from '../thirdparts/index1'
import './index.css'
const addArray = arr => {
    const result = arr.reduce((a, b) => a + b, 0)
    return result;
}
function isNum (num) {
    console.log(ENV) // replace 插件测试
    if (typeof num === 'number') {
        return true
    } else {
        return false
    }
}
function sayHelloTo (v) {
    return 'hello ' + v
}
const result1 = sayHelloTo('Jason');
const result2 = addArray([1,2, 3, 4]);

// Print the results on the page.
const printTarget = document.getElementsByClassName('debug__output')[0]

printTarget.innerText = `sayHelloTo('Jason') => ${result1}\n\n`
printTarget.innerText += `addArray([1, 2, 3, 4]) => ${result2}`