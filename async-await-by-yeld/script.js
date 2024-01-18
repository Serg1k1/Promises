function runner(generatorFunction) {
    const generator = generatorFunction();
  
    function handleNext(result) {
      const { value, done } = generator.next(result);
      if (done) {
        return Promise.resolve(value);
      }
  
      return Promise.resolve(value)
        .then(handleNext)
        .catch((error) => generator.throw(error));
    }
  
    return handleNext();
  }

const sum = (a, b) => new Promise(r => setTimeout(r, 200, a + b));
const cube = num => new Promise(r => setTimeout(r, 300, num ** 3));

function* fooGen() {
    const res1 = yield sum(1, 2);
    const res2 = yield cube(res1);
  
  
    return res2;
  }
  
  runner(fooGen).then(console.log);