'use strict';

/**
 * isRegexp
 * @param reg - param to be judge if a Regexp instance
 * @returns {boolean}
 */
function isRegexp(reg) {
  return Object.prototype.toString.call(reg) === '[object RegExp]';
}

/**
 * strSplice - The strSplice() method changes the content of an string
 *              by removing existing string and/or adding new string like `Array.prototype.splice`.
 * @param str         - target string to be splice.
 * @param start       - Index at which to start changing the string (with origin 0).
 * @param count       - An integer indicating the number of old string elements to remove.
 * @param replaceStr  - The string to add to the `str`, beginning at the start index.
 * @returns {string}
 */
exports.splice = function strSplice(str, start, count, replaceStr) {
  start      = start || 0;
  count      = count || str.length - start;
  replaceStr = replaceStr || '';
  return str.slice(0, start) + replaceStr + str.slice(start + count);
};

/**
 * replace - replace the matches string in str by the invoke iterator callback value.
 *
 * @param str         - target string to be replace.
 * @param regexp      - A RegExp object.
 * @param iterator    - A function to be invoked to create the new substring.
 * @returns {*}
 */
exports.replace = function strReplace(str, regexp, iterator) {
  if (typeof str !== 'string') {
    throw new TypeError('`str` must be a string but a(n) ' + typeof iterator);
  }

  if (!isRegexp(regexp) || !regexp.global) {
    throw new TypeError('`regexp` must be a Regexp type And `g` flag Must be set');
  }

  if (typeof iterator !== 'string' && typeof iterator !== 'function') {
    throw new TypeError('`iterator` must be a string or function but a(n) ' + typeof iterator);
  }

  if (typeof iterator === 'string') {
    let strReplace = iterator;
    iterator       = () => strReplace;
  }

  let match;
  while (match = regexp.exec(str)) {
    let strReplace = iterator(match);
    regexp.lastIndex += (strReplace.length - match[0].length);

    str = exports.splice(str, match.index, match[0].length, strReplace);
  }
  return str;
};

/**
 * replaceAsync - replace the matches string in str by the invoke iterator callback value.
 *
 * @param str               - target string to be replace.
 * @param regexp            - A RegExp object.
 * @param iteratorAsync     - A function to be invoked with the new substring callback.
 * @param done              - invoked until no more substring matches by `regexp` in `str`
 * @returns {*}
 */
exports.replaceAsync = function strReplaceAsync(str, regexp, iteratorAsync, done) {
  if (typeof str !== 'string') {
    throw new TypeError('`str` must be a string but a(n) ' + typeof iterator);
  }

  if (!isRegexp(regexp) || !regexp.global) {
    throw new TypeError('`regexp` must be a Regexp type And `g` flag Must be set');
  }

  if (typeof iteratorAsync === 'string') {
    return done(exports.replace(str, regexp, iteratorAsync));
  }

  if (typeof iteratorAsync !== 'function') {
    throw new TypeError('iteratorAsync must be a string or function');
  }

  let match = regexp.exec(str);
  return match ? iteratorAsync(match, function (err, strReplace) {
    regexp.lastIndex += strReplace.length - match[0].length;
    str = exports.splice(str, match.index, match[0].length, strReplace);
    return err ? done(err) : strReplaceAsync(str, regexp, iteratorAsync, done);
  }) : done(null, str);
};

