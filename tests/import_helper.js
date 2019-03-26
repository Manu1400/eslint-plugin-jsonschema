"use strict"

const requireIndex = require("requireindex")

// npm run test:watch tests against es6
let dir = process.env["SOURCE_DIR"] || "lib"

const ast = require(`../${dir}/ast`)
const RefContext = require(`../${dir}/refContext`).default

const eslintPluginJsonschema = require(`../${dir}`)
const rules = requireIndex(__dirname + `/../${dir}/rules`)

module.exports = {
  ast,
  RefContext,
  eslintPluginJsonschema,
  rules
}
