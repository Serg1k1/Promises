function polling(fetcher, fn, ms) {
    return new Promise((resolve, reject) => {
      let timer = setTimeout(function response() {
        let result = fetcher();
        result.then(data => {
          if (fn(data)) {
            resolve(result);
            clearTimeout(timer)
          } else {
            timer = setTimeout(response, ms)  
          }
        })
      }, ms)
    })
}


const testingResponse = { status: "testing" };
const timeLimitResponse = { status: "timeLimit" };
let i = 0;

const fakeFetcher = async () => {
  return i++ < 3 ? testingResponse : timeLimitResponse;
}

const result = polling(
  fakeFetcher,
  (response) => response.status !== "testing",
  500,
);

result.then(data => console.log(data));
// через 1.5 секунды получим объект со статусом "timeLimit"
