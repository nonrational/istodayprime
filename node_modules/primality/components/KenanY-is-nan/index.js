var numberClass = '[object Number]';
var objectProto = Object.prototype;
var toString = objectProto.toString;

function isNumber(value) {
  return typeof value == 'number' || toString.call(value) == numberClass;
}

/**
 * Checks if `value` is `NaN`.
 *
 * Note: This is not the same as native `isNaN` which will return `true` for
 * `undefined` and other non-numeric values. See http://es5.github.io/#x15.1.2.4.
 *
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the `value` is `NaN`, else `false`.
 */
module.exports = function(value) {
  return isNumber(value) && value != +value;
}