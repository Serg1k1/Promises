function withRetry(fn, limit) {
    let count = 0;
    const errMessages = [];
    
    return async (...args) => {
        while (true) {
            try {
                let result = await fn(...args);
                return result;   
            } catch (err) {
                errMessages.push(err);
                count++;
                if(count === limit) {
                    throw new AggregateError([new Error(`Too Many Calls [${errMessages}]`)]);
                }
            }    
        }
    }
}


// Import the necessary modules or functions, including your implementation of withRetry and the async function sum

// Define the original sum function
async function sum(a, b) {
    // Simulate a function that fails 70% of the time
    return Math.random() < 0.3 ? a + b : Promise.reject('err');
  }
  
  // Apply the withRetry decorator to the sum function
  const enhancedSum = withRetry(sum, 4);
  
  // Test the enhancedSum function with a limit of 4 attempts
  enhancedSum(3, 2).then(
    value => console.log(value),
    // Expected output: 5 (with a success probability of 76%)
    reason => console.log(reason.errors),
    // Expected output: Array of errors ['err1', 'err2', 'err3', 'err4'] (with a failure probability of 24%)
  );