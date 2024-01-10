function sleep(ms) {
    return x => new Promise((resolve) => setTimeout(resolve, ms, x)); 
}

const makePromise = (val, ms) => new Promise(r => setTimeout(r, ms, val));

const multiplyBy3 = x => makePromise(x * 3, 500);
const divideBy5 = x => makePromise(x / 5, 1500);
const square = x => makePromise(x ** 2, 2000);

multiplyBy3(10)
  .then(x => divideBy5(x))
  .then(x => square(x))
  .then(x => console.log(x)); // 36 in 4 seconds

multiplyBy3(10)
  .then(x => divideBy5(x))
  .then(sleep(2000)) // add aditional 2 seconds
  .then(x => square(x))
  .then(x => console.log(x)); // 36 in 6 seconds