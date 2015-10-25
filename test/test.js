/*global describe, it, beforeEach, afterEach*/
var assert = require('assert')
var Changed = require('..')
var domify = require('domify')
var template = require('./template.html')


describe('invalid component', function () {
  var form
  var input

  function query(name) {
    return form.querySelector('[name="' + name + '"]')
  }

  beforeEach(function () {
    form = domify(template)
    document.body.appendChild(form)
    input = document.getElementById('name')
  })

  afterEach(function (done) {
    document.body.removeChild(form)
    setTimeout(done, 10)
  })

  it('should throw error when first argument is not form', function () {
    var err
    var el = document.createElement('div')
    try {
      new Changed(el)
    } catch(e) {
      err = e
    }
    assert(/changed-form/.test(err.message))
  })

  it('should return false when form not changed', function () {
    var checker = new Changed(form)
    assert.equal(checker.changed(), false)
    input.value = 'tobi'
    checker.reset()
    assert.equal(checker.changed(), false)
  })

  it('should works with changed text input', function () {
    var checker = new Changed(form)
    input.value = 'bear'
    var changed = checker.changed()
    assert.equal(changed.name, 'bear')
  })

  it('should works with changed select/radio/checkbox', function () {
    var checker = new Changed(form, {
      pets: 'array'
    })
    form.querySelector('[name="country"]').value = 'China'
    var ck = form.querySelector('[name="pets"]')
    ck.checked = true
    var radio = form.querySelector('[name="size"]')
    radio.checked = true
    var changed = checker.changed()
    assert.deepEqual(changed, {
      country: 'China',
      size: radio.value,
      pets: [ck.value]
    })
  })

  it('should works with default formatter', function () {
    var checker = new Changed(form, {
      pets: 'array',
      active: 'boolean',
      count: 'number',
      date: 'timestamp'
    })
    query('active').checked = true
    checker.reset()
    query('active').checked = false
    query('count').value = '1,618.37'
    query('date').value = '1971-01-01'
    var changed = checker.changed()
    assert.deepEqual(changed, {
      active: false,
      count: 1618.37,
      date: 31536000000
    })
  })

  it('should works with custom formatter', function () {
    var checker = new Changed(form, {
      tags: function (v) {
        return v.split(',')
      }
    })
    query('tags').value = 'a,b,c,d'
    var changed = checker.changed()
    assert.deepEqual(changed, {
      tags: ['a', 'b', 'c', 'd']
    })
  })
})
