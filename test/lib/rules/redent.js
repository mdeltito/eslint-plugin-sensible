'use strict'

const path = require('path')
const fs = require('fs')

const {RuleTester} = require('eslint')
const rule = require('../../../lib/rules/indent')

const fixture_path = path.join(__dirname, '..', '..', 'fixture')
const fixture = fs.readFileSync(fixture_path, 'utf8')

const Suite = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018
  , sourceType: 'module'
  }
, rules: {
    "indent": 0
  }
})

Suite.run('redent', rule, {
  valid: [
    {code: 'var x = {\n  a: 1\n, b: 2\n}\nvar a = 1\n  + 5'}
  , {code: fixture}
  ]
, invalid: [{
    code: 'var x = {\n  a: 1\n  , b: 2\n}\n'
  , errors: [{
      message: 'Expected indentation of 0 spaces but found 2.'
    , type: 'Punctuator'
    }]
  }]
})
