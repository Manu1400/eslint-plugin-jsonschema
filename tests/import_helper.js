"use strict"

const requireIndex = require("requireindex")

// npm run test:watch tests against es6
let dir = process.env["SOURCE_DIR"] || "lib"

module.exports = {
  ast: require(`../${dir}/ast`),
  RefContext: require(`../${dir}/refContext`),
  eslintPluginJsonschema: require(`../${dir}`),
  rules: requireIndex(__dirname + `/../${dir}/rules`)
}
