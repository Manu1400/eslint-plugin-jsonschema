"use strict"

const { ast } = require("./import_helper")
let { calculateJsonPointer } = ast

//const { assert } = require("power-assert")
const assert = require('assert');

const { parse } = require("esprima")

const getNodeWithParent = (root, items) => {
  let tmp    = root
  let parent = root
  items.forEach(item => {
    tmp = tmp[item]
    if (tmp.type) {
      tmp.parent = parent
      parent = tmp
    }
  })

  return tmp
}

describe("ast2jsonPointer", () => {
  it("nested object works", () => {
    let object = {
      id: {
        key: "value"
      }
    }
    let ast     = parse("var json = " + JSON.stringify(object))
    let jsonAst = ast.body[0].declarations[0].init

    let node = getNodeWithParent(jsonAst, [ "properties", 0, "value", "properties", 0])

    assert( calculateJsonPointer(node) == "/id/key" )
  }),

  it("array of object works", () => {
    let object = {
      id: [
        { key: "value" }
      ]
    }
    let ast     = parse("var json = " + JSON.stringify(object))
    let jsonAst = ast.body[0].declarations[0].init

    let node = getNodeWithParent(jsonAst, [ "properties", 0, "value" ])
    assert( calculateJsonPointer(node) == "/id" )

    node = getNodeWithParent(node, [ "elements", 0, "properties", 0 ])
    assert( calculateJsonPointer(node) == "/id/0/key" )
  })

  it("complicated object works", () => {
    let object = {
      id: [
        {
          key1: [
            { id: "hoge" }
          ],
          key2: [
            { id: "hoge" },
            { id: "hoge" },
          ]
        }
      ]
    }
    let ast     = parse("var json = " + JSON.stringify(object))
    let jsonAst = ast.body[0].declarations[0].init

    let node = getNodeWithParent(jsonAst, [
      "properties", 0, "value", "elements", 0, "properties", 1, "value", "elements", 1, "properties", 0
    ])

    assert(calculateJsonPointer(node) == "/id/0/key2/1/id")
  })
})
