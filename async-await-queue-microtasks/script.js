async function double(x) {
    return x + x;
  }
  
  
  async function cube(x) {
    if (typeof x !== "number") {
      throw "Invalid argument";
    }
    return x ** 3;
  }
  
  
  async function compute(x) {
    try {
      const doubledX = await double(x);
      return cube(doubledX)
    } catch (e) {
      throw "Error while computing";
    } 
  }
  
  
  // Task 1
  compute(2).then(
    x => console.log({ i: 1, x }),
    x => console.log({ i: 2, x }),
  );
  // x => console.log({ i: 1, 64 }),
  
  // Task 2
  compute("2").then(
    x => console.log({ i: 1, x }),
    x => console.log({ i: 2, x }),
  );
  // x => console.log({ i: 2, Invalid argument }),