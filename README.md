[![Build Status](https://travis-ci.org/Manu1400/eslint-plugin-jsonschema.svg?branch=master)](https://travis-ci.org/Manu1400/eslint-plugin-jsonschema)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest) [![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)


# eslint-plugin-jsonschema

eslint plugin for jsonschema

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `@manu1400/eslint-plugin-jsonschema`:

```
$ npm install @manu1400/eslint-plugin-jsonschema --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `@manu1400/eslint-plugin-jsonschema` globally.

## Usage

Add `jsonschema` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "jsonschema"
    ],
    "settings": {
        "jsonschema": {
            "schemaDirectory": [ "/path/to/schema" ]
        }
    }
}
```

TODO: add badge
size: https://bundlephobia.com/result?p=eslint-plugin-jsonschema@0.2.0
