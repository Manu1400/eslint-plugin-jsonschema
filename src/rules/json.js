"use strict"

const { unwrapJson } = require("../util")

const create = context => {
  let json = unwrapJson(context.getSourceCode().getText())

  try {
    JSON.parse(json)
  } catch(err) {
    // starts with 0
    let position = parseInt(err.message.match(/(\d+)/)[0])

    if (position == 0) {
      context.report({
        message: err.message,
        loc: {
          start: { line: 1, column: 0 }, // but column actually reported + 1
          end:   { line: 1, column: 0 }
        }
      })
    } else {
      let length = 0;
      json.split("\n").some((line, i) => {
        let oldLength = length
        length += line.length + 1 // "\n"
        if (length > position) {
          const start = {
            line: i + 1,
            column: position - oldLength
          }
          context.report({
            message: err.message,
            loc: {
              start,
              end: start
            }
          })
          return true
        }
      })
    }
  }

  return {}
}

module.exports = {
  meta: {
    docs: {
      description: "check schema is valid json",
      category: "json",
      recommended: true
    },
    fixable: null,
    schema: []
  },
  create
}
