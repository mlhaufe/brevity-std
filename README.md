# Brevity Standard Library

[![Build](https://github.com/mlhaufe/brevity-std/workflows/Build/badge.svg?branch=master)](https://github.com/mlhaufe/brevity-std/actions?query=workflow%3ABuild%2FRelease)
[![npm version](https://badge.fury.io/js/%40mlhaufe%2Fbrevity-std.svg)](https://www.npmjs.com/package/@mlhaufe/brevity-std)
[![Downloads](https://img.shields.io/npm/dm/@mlhaufe/brevity-std.svg)](https://www.npmjs.com/package/@mlhaufe/brevity-std)

A standard library for use with the [Brevity](https://github.com/mlhaufe/brevity) library

## Installation

The latest version:

```powershell
npm install @mlhaufe/brevity-std
```

A specific version:

```powershell
npm install @mlhaufe/brevity-std@x.x.x
```

For direct use in a browser (no build step):

```html
<script type="importmap">
{
  "imports": {
    "@mlhaufe/brevity-std": "https://unpkg.com/@mlhaufe/brevity-std/index.mjs",
  }
}
</script>
<script type="module">
  import {list} from '@mlhaufe/brevity-std';

  console.log(list(Number)(1, 2, 3).join(', ')); // 1, 2, 3
</script>
```
