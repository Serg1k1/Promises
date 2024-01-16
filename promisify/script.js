function promisify(f, manyArgs = false) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            function callback(err, ...results) {
                if (err) {
                    reject(err)
                } else {
                    resolve(manyArgs ? results : results[0])
                }
            }
            args.push(callback);
            f.call(this, ...args)
        })
    }
}



// sum — пример реализации такой функци
function sum(a, b, cb) {
    setTimeout(() => {
      if (Math.random() < .5) {
        cb(null, a + b); // success
      } else {
        cb("error"); // bad luck
      }
    }, 0);
  }

  
const promisifiedSum = promisify(sum);

// как мы работаем с асинхронными функциями на сегодняшний день
promisifiedSum(3, 4).then(
  value => console.log(value), // 7
  reason => console.log(reason), // "error"
);
