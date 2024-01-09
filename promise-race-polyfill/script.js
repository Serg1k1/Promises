function myRace(promises) {
    return new Promise((resolve, reject) => {
        if(promises.length === 0) {
            return reject(new Error("There are no Promises provided"));
        }

        for(let i = 0; i < promises.length; i++) {
            if(promises[i] instanceof Promise) {
                Promise.resolve(promises[i]).then(
                    (value) => resolve(value),
                    (err) => reject(err)
                );
            } else {
                continue;            
            }
        }
    })
} 


// Assume your Promise.race polyfill is named myRace

// Test Case 1: Resolving with the first fulfilled promise
const promise1 = new Promise((resolve) => setTimeout(() => resolve('Promise 1 resolved'), 200));
const promise2 = new Promise((resolve) => setTimeout(() => resolve('Promise 2 resolved'), 100));

myRace([promise1, promise2])
  .then((result) => console.log('Test Case 1:', result))
  .catch((error) => console.error('Test Case 1:', error));

// Test Case 2: Handling non-promises in the input array
const nonPromise = 'Not a promise';

myRace([nonPromise, promise1, promise2])
  .then((result) => console.log('Test Case 2:', result))
  .catch((error) => console.error('Test Case 2:', error));

// Test Case 3: Resolving with the first fulfilled promise when empty array is provided
myRace([])
  .then((result) => console.log('Test Case 3:', result))
  .catch((error) => console.error('Test Case 3:', error));

// Test Case 4: Rejecting with the first rejected promise
const rejectedPromise = new Promise((_, reject) => setTimeout(() => reject('Rejected promise'), 150));

myRace([promise1, rejectedPromise, promise2])
  .then((result) => console.log('Test Case 4:', result))
  .catch((error) => console.error('Test Case 4:', error));