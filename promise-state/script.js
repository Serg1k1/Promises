function getPromiseState(promise) {
    const status = {};
    return Promise.race([promise, status])
    .then(value => (value === status) ? "pending" : 'fulfilled', () => 'rejected');
}


getPromiseState(Promise.resolve("✅"))
  .then(state => console.log(state === "fulfilled"));

getPromiseState(Promise.reject("💣"))
   .then(state => console.log(state === "rejected"));

getPromiseState(new Promise(() => {}))
   .then(state => console.log(state === "pending"));