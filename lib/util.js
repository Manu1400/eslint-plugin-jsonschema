"use strict";

const jsonPrefix = "var json = ";

const wrapJson = text => {
  return jsonPrefix + text;
};

const unwrapJson = text => {
  return text.substring(jsonPrefix.length);
};

module.exports = {
  wrapJson,
  unwrapJson
};