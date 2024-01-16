function run(fns, limit) {
  const results = [];
  let index = 0;

  function executeNext() {
    const currentIndex = index;
    index++;

    if (currentIndex >= fns.length) {
      return Promise.resolve();
    }

    const currentFn = fns[currentIndex];

    return currentFn().then(result => {
      results[currentIndex] = result;
      return executeNext();
    });
  }

  const executingPromises = [];
  for (let i = 0; i < limit; i++) {
    executingPromises.push(executeNext());
  }

  return Promise.all(executingPromises).then(() => results);
}


const fn1 = () => new Promise(r => setTimeout(r, 3400, "a"));
const fn2 = () => new Promise(r => setTimeout(r, 600, "b"));
const fn3 = () => new Promise(r => setTimeout(r, 2000, "c"));
const fn4 = () => new Promise(r => setTimeout(r, 1400, "d"));
const fn5 = () => new Promise(r => setTimeout(r, 1800, "e"));
const fn6 = () => new Promise(r => setTimeout(r, 400, "f"));

run([fn1, fn2, fn3, fn4, fn5, fn6], 2).then(arr => {
  console.log(arr); // arr === ["a", "b", "c", "d", "e", "f"]
});
