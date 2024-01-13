((Promise) => {
    const originalThen = Promise.prototype.then;

    const myCatch = function(errHandler) {
        return this.then(undefined, errHandler);
    };

    Promise.prototype.myCatch = myCatch;

    Promise.prototype.then = function(...args) {
        console.log(args, this);
        let result;
        try {
            result = originalThen.apply(this, args);
        } catch (err) {
            return myCatch.call(this, err);
        }
        return result;
    };
})(Promise);

Promise.resolve(10)
  .then(x => x + 100)
  .then(x => {
    throw x * 2;
  })
  .then(x => x + 20)
  .then(x => x + 30)
  .myCatch(x => {
    console.log(x); // 220
  });