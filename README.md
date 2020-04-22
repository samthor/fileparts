[![Tests](https://github.com/samthor/fileparts/workflows/Tests/badge.svg)](https://github.com/samthor/fileparts/actions)

Tiny package for a file object which has properties like `extname`, `dirname`, and so on which can be modified independently of a path as a whole.
Install as `fileparts`.

```js
import FileParts from 'fileparts';

const fp = new FileParts('path/to/path');
fp.extname = '.there';
fp.name = 'hello';

console.info(path);     // outputs "path/to/hello.there"
console.info('' + fp);  // same, .toString() works
```

Exports a `class`.
You could extend it for your own purposes.
