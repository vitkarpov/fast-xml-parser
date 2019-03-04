# 🚀 Fast-XML-parser

> Is a fast XML parser in TypeScript with zero dependencies

[![CircleCI](https://circleci.com/gh/vitkarpov/fast-xml-parser.svg?style=svg)](https://circleci.com/gh/vitkarpov/fast-xml-parser)
[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)

- blazing fast ⚡
- zero dependencies 📦

## Talk is cheap show me the code, or API overview

```ts
import {parse} from 'fast-xml-parser';

// Node { name: 'root', children: [
//   Node { name: 'html', children: [...]
// }] }
const root = parse('<!DOCTYPE html><html>hello</html>');
```

`Parse` returns a `Node` object, the root of the document tree. `Node` is an object with the following interface:

```ts
interface Node {
  type: TYPES;
  name: string;
  children?: Node[];
  attrs?: Record<string, string>;
}
```
