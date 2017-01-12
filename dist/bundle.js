document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>');
'use strict';

function __$styleInject(css, returnValue) {
  if (typeof document === 'undefined') {
    return returnValue;
  }
  css = css || '';
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);
  return returnValue;
}

__$styleInject("body{ background: #ccc; color: #666; }", undefined);

var addArray = function addArray(arr) {
    var result = arr.reduce(function (a, b) {
        return a + b;
    }, 0);
    return result;
};

console.log("development"); // replace 插件测试

function sayHelloTo(v) {
    return 'hello ' + v;
}
var result1 = sayHelloTo('Jason');
var result2 = addArray([1, 2, 3, 4]);

// Print the results on the page.
var printTarget = document.getElementsByClassName('debug__output')[0];

printTarget.innerText = 'sayHelloTo(\'Jason\') => ' + result1 + '\n\n';
printTarget.innerText += 'addArray([1, 2, 3, 4]) => ' + result2;
//# sourceMappingURL=bundle.js.map
