function callbackify(fn) {
    return (...args) => {
        const callback = args.pop();
        fn(...args).then((value) => callback(null, value),
                         (error) => callback(error));
    }    
}

async function sum(a, b) {
    if (Math.random() < .5) {
      return a + b; // success
    }
    throw "error"; // bad luck
  }

const callbackifiedSum = callbackify(sum);


callbackifiedSum(2, 5, (err, result) => {
    if (err === null) {
      console.log(result); // 7
    } else {
        console.log(err);
    }
  });
  