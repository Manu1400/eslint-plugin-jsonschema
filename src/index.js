"use strict"

const { wrapJson } = require("./util")

const requireIndex = require("requireindex")

const processors = {
  ".json": {
    preprocess: (text, fileName) => {
      return [ wrapJson(text) ]
    },
    postprocess: (messages, fileName) => {
      return messages[0]
    }
  }
}

module.exports = {
  rules: requireIndex(__dirname + "/rules"),
  processors
}
