function myAny(promises) {
    const rejectedArr = [];
    let count = 0;
    return new Promise((resolve, reject) => {
      if (promises.length === 0) {
        reject(new AggregateError('All promises were rejected'));
        return;
      }

      for (let i = 0; i < promises.length; i++) {
        promises[i].then((value) => {
          resolve(value);
        }).catch(err => {
          count++;
          rejectedArr.push(err);
          if (count === promises.length) {
            reject(rejectedArr);
          }
        })
      }        
    })
}


// function myAny(promises) {
//   return new Promise((resolve, reject) => {
//     if (promises.length === 0) {
//       reject(new AggregateError('No promises provided'));
//       return;
//     }

//     promises.forEach((promise) => {
//       Promise.resolve(promise)
//         .then(resolve)
//         .catch((error) => {
//           // Ignore individual errors, handle them collectively
//         });
//     });
//   });
// }

// Assuming you have a polyfill for Promise.any
// Replace myAny with the actual name of your polyfill

// Test case 1: Basic functionality
const promise1 = new Promise((resolve) => setTimeout(() => resolve("First resolved!"), 40));
const promise2 = new Promise((resolve, reject) => setTimeout(() => resolve("Second resolved!"), 10));
const promise3 = new Promise((_, reject) => setTimeout(() => reject("Third rejected!"), 150));

myAny([promise1, promise2, promise3])
  .then((result) => {
    console.log(result);
    // Expected output: 'Second rejected!'
  })
  .catch((errors) => {
    console.error(errors);
    // Expected output: ['First resolved!', 'Third rejected!']
  });

// Test case 2: All promises reject
const promisesReject = [
  Promise.reject("Error1"),
  Promise.reject("Error2"),
  Promise.reject("Error3"),
];

myAny(promisesReject)
  .then((result) => console.log(result))
  .catch((errors) => {
    console.error(errors);
    // Expected output: ['Error1', 'Error2', 'Error3']
  });

// Test case 3: Only one promise fulfills
const promisesFulfill = [
  Promise.reject("Error1"),
  Promise.resolve("Fulfilled!"),
  Promise.reject("Error2"),
];

myAny(promisesFulfill)
  .then((result) => {
    console.log(result);
    // Expected output: 'Fulfilled!'
  })
  .catch((errors) => console.error(errors));

// Test case 4: Empty array input
myAny([])
  .then((result) => console.log(result))
  .catch((errors) => {
    console.error(errors);
    // Expected output: 'AggregateError: All promises were rejected'
  });