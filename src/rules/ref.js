"use strict"

const { unwrapJson } = require("../util")
const RefContext     = require("../refContext")
const jsonpointer    = require("jsonpointer")

const create = context => {
  let json = unwrapJson(context.getSourceCode().getText())

  let targetSchema
  try {
    targetSchema = JSON.parse(json);
  } catch(err) {
    // Do nothing for invalid json
    return {}
  }

  const onProperty = node => {
    if (node.key.value !== '$ref') return;

    const ref = node.value.value;
    const [id, pointer] = ref.split("#")

    let passed;
    if (id) {
      passed = RefContext.contains(context, ref);
    } else {
      passed = jsonpointer.get(targetSchema, pointer);
    }

    if (!passed) {
      context.report({
        message: `cannot resolve ref: "${ref}"`,
        node: node.value,
      })
    }
  };

  return {
    Property: onProperty,
  }
}

module.exports = {
  meta: {
    docs: {
      description: "check $ref is valid",
      category: "ref",
      recommended: true,
    },
    fixable: null,
    schema: []
  },
  create
}
