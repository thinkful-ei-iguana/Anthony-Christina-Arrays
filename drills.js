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

// function main() {
//   Array.SIZE_RATIO = 3;

//   let arr = new Array();

//   arr.push('tauhida');

//   console.log(arr[0]); // prints undefined because the console log and push method are happening asynchronously and theres no default value in the array

//   // the resize method increases/decreases the size and memory allocated to the array
// }

// main();

// const errorThatNeverHappens = str => {
//   let newVal = str.split(' ').join('%20');
//   return newVal;
// };

// console.log(errorThatNeverHappens('www.thinkful.com /tauh ida parv een'));

// const number = input => {
//   let result = [];
//   for (let i of input) {
//     if (i >= 5) {
//       result.push(i);
//     }
//   }
//   return result;
// };

// console.log(number([4, 6, -3, 5, -2, 1]));

// const largestSum = input => {
//   let largestSum = 0;
//   for (let i of input) {
//     let newSum = i + i;
//     if (newSum > largestSum) {
//       largestSum = newSum;
//     }
//   }
//   return largestSum;
// };

// console.log(largestSum([4, 6, -3, 5, -2, 1]));

// const mergedArray = (input1, input2) => {
//   const newArr = input1.concat(input2).sort((a, b) => a - b);
//   return newArr;
// };

// console.log(mergedArray([1, 3, 6, 8, 11], [2, 3, 5, 8, 9, 10]));

// const removeChar = input => {
//   const invalidChars = ['a', 'e', 'i', 'o', 'u'];
//   let newVal = '';
//   for (let i of input) {
//     for (let k of invalidChars) {
//       if (i === k) {
//         i = '';
//       }
//     }
//     newVal += i;
//   }
//   return newVal;
// };

// console.log(removeChar('Battle of the Vowels: Hawaii vs. Grozny'));

// const product = input => {
//   let result = [];
//   for (let i = 0; i < input.length; i++) {
//     let newVal = 1;
//     for (let k = 0; k < input.length; k++) {
//       if (i !== k) {
//         newVal = newVal * input[k];
//       }
//     }
//     result.push(newVal);
//   }
//   return result;
// };

// console.log(product([1, 3, 9, 4]));

// const twoD = input => {
//   let result = input;
//   let rows = [];
//   let columns = [];

//   for (let i = 0; i < input.length; i++) {
//     for (let k = 0; k < input[0].length; k++) {
//       if (input[i][k] === 0) {
//         rows.push(i);
//         columns.push(k);
//       }
//     }
//   }

//   rows.forEach(item => {
//     for (let i = 0; i < result[0].length; i++) {
//       result[item][i] = 0;
//     }
//   });

//   columns.forEach(item => {
//     for (let i = 0; i < result.length; i++) {
//       result[i][item] = 0;
//     }
//   });

//   return result;
// };

// console.log(
//   twoD([
//     [1, 0, 1, 1, 0],
//     [0, 1, 1, 1, 0],
//     [1, 1, 1, 1, 1],
//     [1, 0, 1, 1, 1],
//     [1, 1, 1, 1, 1]
//   ])
// );

// const stringRotation = (input1, input2) => {
//   if (input1.length !== input2.length) {
//     return false;
//   }
//   for (let i = 1; i < input1.length; i++) {
//     if (
//       input1.substring(0, i) ===
//       input2.substring(input1.length - i, input1.length)
//     ) {
//       return true;
//     }
//   }
//   return false;
// };

// console.log(stringRotation('amazon', 'azonam'));
