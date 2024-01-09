function myAllSettled(promises) {
    const statuts = [];
    let count = 0;

    return new Promise((resolve) => {
        if(promises.length === 0) {
            resolve([]);
        }

        for (let i = 0; i < promises.length; i++) {
            promises[i].then((value) => {
                statuts[i] = {status: "fulfilled", value: value};   
            }).catch((err) => {
                statuts[i] = {status: "rejected", reason: err};  
            }).finally(() => {
                count++;
                if (count === promises.length) {
                    resolve(statuts);
                }
            })
        }
    })
}



// Test case 1: Basic functionality
const promise1 = Promise.resolve(42);
const promise2 = new Promise((_, reject) => setTimeout(() => reject("Error!"), 100));
const promise3 = Promise.resolve("Success!");

myAllSettled([promise1, promise2, promise3])
  .then((results) => {
    console.log(results);
    // Expected output: [
    //   { status: 'fulfilled', value: 42 },
    //   { status: 'rejected', reason: 'Error!' },
    //   { status: 'fulfilled', value: 'Success!' }
    // ]
  })
  .catch((error) => console.error("Unexpected error:", error));

 // Test case 2: Empty array input
 myAllSettled([])
   .then((results) => {
     console.log(results);
     // Expected output: []
   })
   .catch((error) => console.error("Unexpected error:", error));

 // Test case 3: All promises fulfill
 const promisesFulfill = [Promise.resolve(1), Promise.resolve("foo"), Promise.resolve(true)];
 myAllSettled(promisesFulfill)
   .then((results) => {
     console.log(results);
     // Expected output: [
     //   { status: 'fulfilled', value: 1 },
     //   { status: 'fulfilled', value: 'foo' },
     //   { status: 'fulfilled', value: true }
     // ]
   })
   .catch((error) => console.error("Unexpected error:", error));

 // Test case 4: All promises reject
 const promisesReject = [Promise.reject("Error1"), Promise.reject("Error2"), Promise.reject("Error3")];
 myAllSettled(promisesReject)
   .then((results) => {
     console.log(results);
     // Expected output: [
     //   { status: 'rejected', reason: 'Error1' },
     //   { status: 'rejected', reason: 'Error2' },
     //   { status: 'rejected', reason: 'Error3' }
     // ]
   })
   .catch((error) => console.error("Unexpected error:", error));