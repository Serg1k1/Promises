// function compose(promises) {
//     return x => {
//         return promises.reduceRight((chain, func) => chain.then(func), Promise.resolve(x));
//     }
// }

const compose = (functions) => input => functions.reduceRight((chain, func) => chain.then(func), Promise.resolve(input));

const square = x => new Promise(r => setTimeout(r, 2000, x ** 2));
const multiplyBy3 = x => new Promise(r => setTimeout(r, 500, x * 3));
const divideBy5 = x => new Promise(r => setTimeout(r, 1500, x / 5));

const foo = compose([square, divideBy5, multiplyBy3]); 

console.time("xxx");
foo(10).then(value => {
  console.log(value); // 36
  console.timeEnd("xxx");
});
