async function run(arr, chunk) {
  const newArr = [];
  for (let i = 0; i < arr.length; i += chunk) {
    const arrChunk = arr.slice(i, i + chunk);
    newArr.push(arrChunk);
  }  

  const resultArr = [];
  
  for (let i = 0; i < newArr.length; i++) {
    let promises = newArr[i];
    for (let j = 0; j < promises.length; j++) {
      let result = await promises[j]();
      resultArr.push(result);
    }
  }
  return resultArr;
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
