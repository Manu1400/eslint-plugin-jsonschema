"use strict"

const { rules } = require("../import_helper")

const { RuleTester } = require("eslint")
let ruleTester = new RuleTester()

let validJsons = [
  '{}',
  '{ "test": "json" }',
  '[]',
  '"a"',
  'null',
  '0',
]

let inValidJsons = [
  { code: 'a',             errors: [ { message: "Unexpected token a in JSON at position 0",  line: 1, column: 1 } ] }, // 0 + 1
  { code: '{\n"a": a\n}',  errors: [ { message: "Unexpected token a in JSON at position 7",  line: 2, column: 6 } ] }, // 7 + 1 - 2
  { code: '{\n"a": 0,\n}', errors: [ { message: "Unexpected token } in JSON at position 10", line: 3, column: 1 } ] }, // 10 + 1 - 2 - 8
]

ruleTester.run("jsonschema/json", rules.json, {
  // XXX:
  valid: validJsons.map(text => "var json = " + text),
  invalid: inValidJsons.map(invalid => Object.assign(invalid, { code: "var json = " + invalid.code }))
})
