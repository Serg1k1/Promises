((Promise) => {
    const myFinally = function (callback) {
        return this.then(
            value => Promise.resolve(callback()).then(() => value),
            reason => Promise.resolve(callback()).then(() => { throw reason; })
        ).catch(reason => {
            console.error(reason);
            throw reason;
        });
    }

    Promise.prototype.myFinally = myFinally;
})(Promise);

Promise.resolve(100)
  .myFinally(function foo(x) {
    throw "lol";
  })
  .then(
    x => console.log("then 1", x),
    x => console.log("then 2", x), // "lol"
  )