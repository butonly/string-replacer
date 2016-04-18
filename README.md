string-replacer
===============

### strReplacer#replace
    
 * `str`         - target string to be replace.
 * `regexp`      - A RegExp object.
 * `iterator`    - A function to be invoked to create the new substring.

```js
let content = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let reg = /[A-Y]/g;
let str = strSplicer.replace(content, new RegExp(reg), (match)=> {
 // match is the result of RegExp(reg).exec()
 return match[0] + '-';
});
 // str: A-B-C-D-E-F-G-H-I-J-K-L-M-N-O-P-Q-R-S-T-U-V-W-X-Y-Z
```

### strReplacer#replaceAsync

 * `str`               - target string to be replace.
 * `regexp`            - A RegExp object.
 * `iteratorAsync`     - A function to be invoked with the new substring callback.
 * `done`              - invoked until no more substring matches by `regexp` in `str`

```js
let content = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let reg = /[A-Y]/g;
strSplicer.replaceAsync(content, new RegExp(reg), iteratorAsync(match, cb)=> {
 // match is the result of RegExp(reg).exec()
 cb(null, match[0] + '-');
}, (err, str)=> {
 // err: null
 // str: A-B-C-D-E-F-G-H-I-J-K-L-M-N-O-P-Q-R-S-T-U-V-W-X-Y-Z
});
```
