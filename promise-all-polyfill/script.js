function all(promises) {
    let promiseArr = [];
    let count = 0;

    return new Promise((resolve, reject) => {
      if(promises.length === 0) {
        resolve([]);
      }

      for (let i = 0; i < promises.length; i++) {
        promises[i].then((result) => {
          promiseArr.push(result);  
          count++;
          if (count === promises.length) {
            console.log(count)
            resolve(promiseArr);
          }
        }).catch((e) => {
          reject(e);
        })   
      }
    })
}

const p1 = Promise.resolve("a");
const p2 = Promise.resolve('b');
const p3 = Promise.resolve("c");

all([p1, p2, p3]).then(arr => {
  console.log(arr); // arr === ["a", "b", "c"]
});
