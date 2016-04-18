'use strict';
const strSplicer = require('../lib');

let content = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let reg = /[A-Y]/g;

//strSplicer#splice;

// strReplacer#replace example

console.log(null, strSplicer.replace(content, new RegExp(reg), function (match) {
 return match[0] + '-';
}));

// strReplacer#replaceAsync example

strSplicer.replaceAsync(content, new RegExp(reg), function iteratorAsync(match, cb) {
 cb(null, match[0] + '-');
}, function (err, str) {
 console.log(err, str);
});
