var invalid = require('invalid')
var query = require('query')
var serialize = require('form-serialize')

/**
 * Init changed by `form` and `format` Object
 *
 * format support number, boolean, timestamp, function and array of strings
 *
 * @param {Element} form element
 * @param {Object} format config [optional]
 * @api public
 */
function Changed(form, format) {
  if (!(this instanceof Changed)) return new Changed(form, format)
  this.format = format || {}
  if (/form/i.test(form.tageName)) throw new Error('changed-form require form element')
  this.form = form
  this.origObj = serialize(form, {
    hash: true,
    empty: true
  })
}

/**
 * Get changed object with format
 *
 * @return {Object}
 * @api public
 */
Changed.prototype.changed = function () {
  var obj = serialize(this.form, {
    hash: true,
    empty: true
  })
  var diff = this.diffObj(this.origObj, obj, this.format)
  if (Object.keys(diff).length === 0) return false
  return diff
}

/**
 * Reset the original form value
 *
 * @api public
 */
Changed.prototype.reset = function () {
  this.origObj = serialize(this.form, {
    hash: true,
    empty: true
  })
}

Changed.prototype.diffObj =function (origObj, newObj, format) {
  var res = {}
  var arr
  var form = this.form
  Object.keys(newObj).forEach(function (k) {
    var orig = origObj[k]
    var v = newObj[k]
    var el = query('[name=' + k + ']', this.form)
    if (invalid(el, form)) return
    if (format[k] === 'array') {
      orig = toArray(orig)
      v = toArray(v)
      arr = getDifferent(orig, v)
      if (arr) res[k] = cleanArray(arr)
    } else if (orig !== v) {
      var type = format[k]
      if (type) {
        if (typeof type === 'function') {
          res[k] = type(v)
        } else {
          res[k] = formatWithType(v, type)
        }
      } else {
        res[k] = newObj[k]
      }
    }
  })
  return res
}

/**
 * Check if two array has different values return new array if different or
 * false if not
 *
 * @param {Array} arr
 * @param {Array} newArr
 * @return {Mixed}
 * @api public
 */
function getDifferent(arr, newArr) {
  if (arr.length !== newArr.length) return newArr
  for (var i = 0, l = arr.length; i < l; i++) {
    if (arr[i] !== newArr[i]) return newArr
  }
  return false
}

function toArray(str) {
  if (typeof str === 'string') {
    if (str.trim() === '') return []
    return [str]
  }
  return str
}

/**
 * Format value with type
 *
 * @param {string} val
 * @param {String} type [number|boolean|timestamp]
 * @return {Mixed} formatted value
 * @api public
 */
function formatWithType(val, type) {
  switch (type) {
    case 'number':
      if (val === '') return 0
      val = val.replace(/[^\d\.]/g, '')
      return parseFloat(val, 10)
    case 'boolean':
      return !!val
    case 'timestamp':
      return (new Date(val)).getTime()
    default:
      return val
  }
}

/**
 * Create new Array with empty string removed
 *
 * @param {Array} arr
 * @return {Array}
 * @api public
 */
function cleanArray(arr) {
  return arr.filter(function (v) {
    return v !== ''
  })
}

module.exports = Changed

