function myResolve(value) {
    return new Promise(resolve => resolve(value));
}


// Assume your Promise.resolve and Promise.reject polyfills are named myResolve and myReject

// Test Case 1: Resolving with a value
myResolve('Resolved with a value')
  .then((result) => console.log('Test Case 1:', result))
  .catch((error) => console.error('Test Case 1:', error));

// Test Case 2: Resolving with a promise
const innerPromise = new Promise((resolve) => resolve('Inner promise resolved'));

myResolve(innerPromise)
  .then((result) => console.log('Test Case 2:', result))
  .catch((error) => console.error('Test Case 2:', error));

  // Test Case 4: Handling non-promise values
const nonPromise = 'Not a promise';

myResolve(nonPromise)
  .then((result) => console.log('Test Case 4:', result))
  .catch((error) => console.error('Test Case 4:', error));