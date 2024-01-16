function sync() {
    console.log('A');
  }
  
  
  async function async1() {
    console.log('B');
    await async2();
    console.log('C');
  }
  
  
  async function async2() {
    console.log('D');
    await sync();
    console.log('E');
  }
  
  
  console.log('F');
  async1();
  
  
  new Promise(function (resolve) {
    console.log('H');
    resolve();
    console.log('I');
  })
    .then(() => console.log('J'))
    .then(() => console.log('K'))
  
  
  console.log('L');
  
  // [F, B, D, A, H, I, L, E, J, C, K]