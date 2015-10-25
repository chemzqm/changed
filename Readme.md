# Changed

[![Build Status](https://secure.travis-ci.org/chemzqm/changed.png)](http://travis-ci.org/chemzqm/changed)

Get changed Object from form with format support [Demo](chemzqm.github.io/changed/)

TODO: test


## Install

    npm i changed-form

## Usage

```
var Changed = require('changed-form')
var form = document.forms[0]
var checker = new Changed(form, {
  pets: 'array',
  active: 'boolean',
  age: 'number'
})

var btn = document.getElementById('submit')
btn.addEventListener('click', function (e) {
  var changed = checker.changed()
  var str = JSON.stringify(changed, null, 2)
  document.getElementById('changed').textContent = str
})

document.getElementById('reset').addEventListener('click', function (e) {
  checker.reset()
})
```

## API

### Changed(form, [format])

Init with `form` element and format Object, format key is `name` for field and value could be a `function` or one of these:

* `number` parsed with `parseFloat()` return 0 if field is empty
* `boolean` parsed with `!!value`
* `timestamp` parsed with `(new Date(value)).getTime()`
* `array` treat the field as array field, always return a new array

### .changed()

Get the changed values as object, or `false` if nothing changed, [invalid](https://github.com/chemzqm/invalid) are ignored from result

### .reset()

Reset current form values as default


## MIT license
Copyright (c) 2015 chemzqm@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
