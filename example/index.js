var Changed = require('..')
var form = document.forms[0]
var checker = new Changed(form, {
  pets: 'array',
  active: 'boolean',
  age: 'number'
})

var btn = document.getElementById('submit')
btn.addEventListener('click', function (e) {
  e.preventDefault()
  var changed = checker.changed()
  var str = JSON.stringify(changed, null, 2)
  document.getElementById('changed').textContent = str
})

document.getElementById('reset').addEventListener('click', function (e) {
  e.preventDefault()
  checker.reset()
})
