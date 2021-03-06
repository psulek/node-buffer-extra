/* global it */
/* global describe */
var chai = require("chai");
var expect = chai.expect;
var assert = chai.assert;

var Buffer = require('buffer').Buffer;
var bfx = require('../lib/index.js');

describe('equals()', function () {
	describe('equals() using Buffer class', function () {
		it('compare two buffers with zero bytes', function () {
			var bufferA = new Buffer([]);
			var bufferB = new Buffer([]);
			assert.isTrue(bfx.equals(bufferA, bufferB));
		});

		it('compare two buffers with different length', function () {
			var bufferA = new Buffer([1]);
			var bufferB = new Buffer([1, 2]);
			assert.isFalse(bfx.equals(bufferA, bufferB));
		});

		it('compare two buffers with same length but different values', function () {
			var bufferA = new Buffer([1, 3]);
			var bufferB = new Buffer([1, 2]);
			assert.isFalse(bfx.equals(bufferA, bufferB));
		});

		it('compare two buffers with same length and same values', function () {
			var bufferA = new Buffer([1, 2]);
			var bufferB = new Buffer([1, 2]);
			assert.isTrue(bfx.equals(bufferA, bufferB));
		});

		it('compare two buffers starting at same position and same count', function () {
			var bufferA = new Buffer([1, 2, 3, 4]);
			var bufferB = new Buffer([1, 2, 3, 4]);
			assert.isTrue(bfx.equals(bufferA, bufferB, 2, 2, 2));
		});

		it('compare two buffers starting at different position and same count', function () {
			var bufferA = new Buffer([1, 2, 3, 4]);
			var bufferB = new Buffer([1, 2, 3, 4]);
			assert.isFalse(bfx.equals(bufferA, bufferB, 2, 1, 2));
		});

		it('compare two buffers starting at different position and count exceed length of both buffers', function () {
			var bufferA = new Buffer([1, 2, 3, 4]);
			var bufferB = new Buffer([1, 2, 3, 4]);
			assert.isTrue(bfx.equals(bufferA, bufferB, 2, 2, 5));
		});

		it('compare two buffers starting at specific position for first buffer and full test for second buffer', function () {
			var bufferA = new Buffer([1, 2, 3, 4]);
			var bufferB = new Buffer([3, 4]);
			assert.isTrue(bfx.equals(bufferA, bufferB, 2, 0, 2));
		});

		it('compare two buffers with negative count value', function () {
			var bufferA = new Buffer([1, 2, 3, 4]);
			var bufferB = new Buffer([3]);
			assert.isTrue(bfx.equals(bufferA, bufferB, 2, 0, -1));
		});
	});

	describe('equals() using string', function () {
		it('compare two empty strings as buffers', function () {
			var bufferA = '';
			var bufferB = '';
			assert.isTrue(bfx.equals(bufferA, bufferB));
		});

		it('compare equal (not empty) strings as buffers', function () {
			var bufferA = 'abc';
			var bufferB = 'abc';
			assert.isTrue(bfx.equals(bufferA, bufferB));
		});

		it('compare non equal strings as buffers', function () {
			var bufferA = 'abc';
			var bufferB = 'def';
			assert.isFalse(bfx.equals(bufferA, bufferB));
		});

		it('compare strings at specified position as buffers', function () {
			var bufferA = 'abcdef';
			var bufferB = 'def';
			assert.isTrue(bfx.equals(bufferA, bufferB, 3, 0, 10));
		});
	});

	describe('equals() using array of octets', function () {
		it('compare two empty array of octets', function () {
			var bufferA = [];
			var bufferB = [];
			assert.isTrue(bfx.equals(bufferA, bufferB));
		});

		it('compare equal array of octets', function () {
			var bufferA = [10,20,30];
			var bufferB = [10,20,30];
			assert.isTrue(bfx.equals(bufferA, bufferB));
		});

		it('compare non equal array of octets', function () {
			var bufferA = [10, 20, 30];
			var bufferB = [10, 20, 40];
			assert.isFalse(bfx.equals(bufferA, bufferB));
		});

		it('compare array of octets at specified position', function () {
			var bufferA = [10, 20, 30, 40];
			var bufferB = [30, 40];
			assert.isTrue(bfx.equals(bufferA, bufferB, 2, 0, 10));
		});
	});
});

describe('sliceNew()', function () {
	it('slice new buffer from other buffer', function () {
		var bufferA = new Buffer([1, 2, 3, 4]);
		var bufferB = bfx.sliceNew(bufferA, 1, 2);
		// compare newly slices buffer to expected buffer values
		assert.isTrue(bfx.equals(bufferB, new Buffer([2, 3])));
		
		// compare original buffer to be same as before slicing
		assert.isTrue(bfx.equals(bufferA, new Buffer([1, 2, 3, 4])));
	});

	it('slice new buffer from other buffer with negative count value', function () {
		var bufferA = new Buffer([1, 2, 3, 4]);
		var bufferB = bfx.sliceNew(bufferA, 1, -2);

		assert.isTrue(bfx.equals(bufferB, new Buffer([2, 3])));
	});

	it('slice new buffer from other buffer with count exceed length of buffer', function () {
		var bufferA = new Buffer([1, 2, 3, 4]);
		var bufferB = bfx.sliceNew(bufferA, 3, 10);

		assert.isTrue(bfx.equals(bufferB, new Buffer([4])));
	});

	it('slice new buffer from other buffer with negative position index', function () {
		var bufferA = new Buffer([1, 2, 3, 4]);
		var bufferB = bfx.sliceNew(bufferA, -1, 2);

		assert.isTrue(bfx.equals(bufferB, new Buffer([1, 2])));
	});
});