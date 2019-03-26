"use strict"

const { eslintPluginJsonschema } = require("./import_helper")

const assert = require("assert")

describe("eslint-plugin-jsonschema", () => {
  it("exports processor of json", () => {
    assert(".json" in eslintPluginJsonschema.processors)
  })

  it("exports rules", () => {
    assert("rules" in eslintPluginJsonschema)
  })
})
