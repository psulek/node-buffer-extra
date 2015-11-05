var Buffer = require('buffer').Buffer;
require("util-is");
var util = require('util');

function equals(bufferA, bufferB, posA, posB, count) {
	if (bufferA == null && bufferB == null) return true;
	
	if (!Buffer.isBuffer(bufferA)) throw new Error('bufferA is of type "'+ typeof(bufferA) +'" where "Buffer" type is required!');
	if (!Buffer.isBuffer(bufferB)) throw new Error('bufferB is of type "'+ typeof(bufferB) +'" where "Buffer" type is required!');

	if (bufferA.length === 0 && bufferB.length === 0) return true;

	if (!util.isNumber(posA) || posA < 0) posA = 0;
	if (!util.isNumber(posB) || posB < 0) posB = 0;
	if (!util.isNumber(count)) count = bufferA.length;

	if (count < 0)
		count = count * -1; // abs

	if (posA >= bufferA.length || posB >= bufferB.length) return false;

	if (typeof bufferA.equals === 'function' &&
		posA == 0 && posB == 0 && count == bufferA.length)
			return bufferA.equals(bufferB);

	var countA = (posA + count) <= bufferA.length ? count : bufferA.length - posA;
	var countB = (posB + count) <= bufferB.length ? count : bufferB.length - posB;

	if (countA !== countB) return false;

	for (var i = 0; i < count; i++)
		if (bufferA[posA + i] !== bufferB[posB + i])
			return false;

	return true;
}

function sliceNew(source, start, count) {
	if (source == null) throw new Error('source cannot be null!');
	
	if (!Buffer.isBuffer(source)) throw new Error('source is of type "'+ typeof(source) +'" where "Buffer" type is required!');
	
	if (!util.isNumber(start) || start < 0) start = 0;
	
	if (start >= source.length) throw new Error('"start" is out of buffer size!');
	
	if (count < 0)
		count = count * -1; // abs

	var end = start + count;
	if (end > source.length) {
		count = source.length - start;
		end = source.length;
	}
	
	//count = (start + count) <= source.length ? count : source.length - start;
	var target = new Buffer(count);
	source.copy(target, 0, start, end);
	return target;
}

module.exports = {
	equals: equals,
	sliceNew: sliceNew
};