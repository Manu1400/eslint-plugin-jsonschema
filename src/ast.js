"use strict"

const calculateJsonPointer = (node) => {
  let stack  = ""
  let parent = node.parent

  if (node.type == "Property") {
    stack += node.key.value
  }

  if (! parent) {
    return stack
  }

  if (parent.type == "ObjectExpression") {
    stack = "/" + stack
  }

  if (parent.type == "ArrayExpression") {
    let i = parent.elements.findIndex(e => e == node)
    stack = "/" + i + stack
  }

  return calculateJsonPointer(parent) + stack
}

module.exports = {
  calculateJsonPointer
}
