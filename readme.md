# trimstring

[![Build Status](https://img.shields.io/circleci/project/iansinnott/trimstring.svg)](https://circleci.com/gh/iansinnott/trimstring)
[![trimstring on NPM](https://img.shields.io/npm/v/trimstring.svg)](https://www.npmjs.com/package/trimstring)

> 🔪 Neatly trim template strings


## Install

```
$ npm install --save trimstring
```

## Usage

```js
const trimstring = require('trimstring');

const genHtml = props => {
  return trimstring(`
    <!doctype html>
    <html lang='en'>
      <head>
        <meta charset='utf-8'>
        <title>${props.title}</title>
      </head>
      <body>
        ${props.body}
      </body>
    </html>
  `);
};

// Leading whitespace and trailing newlines will be trimmed.
genHtml({ title: 'Trimstring', body: 'This is my favorite library!' }); //=>
`<!doctype html>
<html lang='en'>
  <head>
    <meta charset='utf-8'>
    <title>Trimstring</title>
  </head>
  <body>
    This is my favorite library!
  </body>
</html>`
```


## API

### trimstring(templateString)

#### templateString

Type: `string`

A multiline string for trimming.

**NOTE:** If your string does not need multiple lines then trimstring probably won't help you. The core use of this library is for creating strings without leading whitespace or trailing/leading newlines but allowing you to still write your code in a readable way.

## License

MIT © [Ian Sinnott](http://iansinnott.com)
