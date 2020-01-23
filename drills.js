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

  pop() {
    if (this.length == 0) {
      throw new Error('Index error');
    }
    const value = memoryInstance.get(this.ptr + this.length - 1);
    this.length--;
    return value;
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

function main() {
  Array.SIZE_RATIO = 3;

  let arr = new Array();

  arr.push(3);
  arr.push(5);
  arr.push(15);
  arr.push(19);
  arr.push(45);
  arr.push(10);
  arr.pop();
  arr.pop();
  arr.pop();

  console.log(arr[0]);
}

main();
