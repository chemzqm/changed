/*global describe, it, beforeEach, afterEach*/
var assert = require('assert')
var invalid = require('..')

;(function () {
  var css = '.hide{ display:none; } .hidden{visibility:hidden;}',
  head = document.head || document.getElementsByTagName('head')[0],
  style = document.createElement('style')

  style.type = 'text/css'
  if (style.styleSheet){
    style.styleSheet.cssText = css
  } else {
    style.appendChild(document.createTextNode(css))
  }

  head.appendChild(style)
})()

function create() {
  return document.createElement('div')
}

describe('invalid component', function () {
  var initEl
  var el
  beforeEach(function () {
    initEl = create()
    var child = create()
    initEl.appendChild(child)
    child.appendChild(create())
    el = document.createElement('input')
    child.childNodes[0].appendChild(el)
    document.body.appendChild(initEl)
  })

  afterEach(function (done) {
    document.body.removeChild(initEl)
    el = null
    setTimeout(done, 200)
  })

  it('should be invalid when el disabled', function () {
    el.disabled = true
    assert.equal(invalid(el), true)
  })

  it('should be invalid when el is hidden', function () {
    el.style.display = 'none'
    assert.equal(invalid(el), true)
    el.style.display = 'block'
    assert.equal(invalid(el), false)
    el.style.display = ''
    el.className = 'hide'
    assert.equal(invalid(el), true)
  })

  it('should be invalid when el parent is hidden', function () {
    initEl.style.display = 'none'
    assert.equal(invalid(el), true)
    initEl.style.display = ''
    assert.equal(invalid(el), false)
    initEl.className = 'hide'
    assert.equal(invalid(el), true)
    initEl.className = 'hidden'
    assert.equal(invalid(el), true)
    initEl.className = ''
    assert.equal(invalid(el), false)
  })
})
