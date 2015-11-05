# Node.js: buffer-extra
`buffer-extra` provide extra methods for buildin Buffer class like equals(), sliceNew()


Installation
------------

    npm install --save buffer-extra


Usage
-----

To require this module:

```js
var bfx = require('buffer-extra');
```

Methods
-------
- [equals](#equals)
- [sliceNew](#sliceNew)


### equals()

**equals(bufferA, bufferB, posA, posB, count)**


Compares two buffers if their bytes are equals to each other, same as buildin node.js `Buffer.equals` with one usefull feature to specify positions (of both buffers) to start comparison at and the count of bytes to be compared.
Returns `true` when buffers at specified positions and count equals, otherwise returns `false`.

Params:

- *bufferA* and *bufferB* should be `Buffer`, `string` or array of octets (as used when creating `new Buffer(...)` instance), for `string` encoding `utf8` is used, for other encoding explicitly create new `Buffer` instance with required string encoding
- *posA* and *posB* is number - position on which to start comparing bytes, negative value is not allowed and will act as value 0 (zero), when position exceed buffer(s) length method retuns `false`
- *count* is number - count of bytes to be compared within buffers, negative value will be converted to absolute value    


Example:

```js
var bfx = require('buffer-extra');

var bufferA = new Buffer([1,2,3,4]);
var bufferB = new Buffer([3,4]);

// compare two buffers where bufferA position starts at 2, bufferB position at 0 (zero) with count 2
// method internally compares bytes [3,4] from bufferA and [3,4] from bufferB which is equal
var equals = bfx.equals(bufferA, bufferB, 2, 0, 2);
```



### sliceNew()

**sliceNew(source, start, count)**


Returns a new buffer which **does not reference same memory** as *source* buffer, it allways create new Buffer and fill data from *source* buffer copying *count* bytes starting on *start* position.





License
-------

Licensed under ISC

Copyright (c) 2015 [Peter Šulek](https://github.com/psulek)