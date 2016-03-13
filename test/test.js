/**
 * Created by admin on 2016/2/20.
 */


var re = /(\w+)\s(\w+)/;
var str = 'John Smith';

str.replace(re, '$2, $1'); // "Smith, John"
console.log(RegExp.$1); // "John"
console.log(RegExp.$2); // "Smith"

var reg = /(\w+)\s(\w+)/;
var content = 'John Smith';

let regExec = reg.exec(content);
console.log(regExec);
