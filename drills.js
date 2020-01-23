const memory = require('./memory');

const memoryInstance = new memory();

class Array {
  constructor() {
    this.length = 0;
    this._capacity = 0;
    this.ptr = memoryInstance.allocate(this.length);
  }

  push(value) {
    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }
    memoryInstance.set(this.ptr + this.length, value);
    this.length++;
  }

  _resize(size) {
    const oldPtr = this.ptr;
    this.ptr = memoryInstance.allocate(size);
    if (this.ptr === null) {
      throw new Error('out of memory');
    }
    memoryInstance.copy(this.ptr, oldPtr, this.length);
    memoryInstance.free(oldPtr);
    this._capacity = size;
  }
}

Array.SIZE_RATIO = 3;
