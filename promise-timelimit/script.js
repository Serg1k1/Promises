var timeLimit = function(fn, t) {
	return function(...args) {
        const originalFnPromise = fn(...args);

        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
                reject('Time Limit Exceeded')
            }, t);
        })

        return Promise.race([originalFnPromise, timeoutPromise]);
    }
};



const fn = name => new Promise(resolve => {
    setTimeout(() => {
      resolve(`Hello, ${name}!`);
    }, 500);
  });
  
  const fn250 = timeLimit(fn, 250);
  const fn1000 = timeLimit(fn, 1000);
  
  fn250("World").then(
    value => console.log(1, value),
    reason => console.log(2, reason),  // "Time Limit Exceeded"
  );
  
  fn1000("World").then(
    value => console.log(1, value),  // "Hello, World!"
    reason => console.log(2, reason),
  );