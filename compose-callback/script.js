// Определение асинхронной функции cube
function cube(num, callback) {
    setTimeout(() => {
        if (typeof num !== 'number') {
            callback(new Error('Input is not a number'));
        } else {
            const result = num ** 3;
            callback(null, result);
        }
    }, 1000); // Имитация асинхронной операции
}

// Определение асинхронной функции double
function double(num, callback) {
    setTimeout(() => {
        if (typeof num !== 'number') {
            callback(new Error('Input is not a number'));
        } else {
            const result = num * 2;
            callback(null, result);
        }
    }, 1000); // Имитация асинхронной операции
}

// Определение асинхронной функции subtract5
function subtract5(num, callback) {
    setTimeout(() => {
        if (typeof num !== 'number') {
            callback(new Error('Input is not a number'));
        } else {
            const result = num - 5;
            callback(null, result);
        }
    }, 1000); // Имитация асинхронной операции
}

function compose(fns) {
    return async (...args) => {
        async function recursion(result, callback) {
            if (fns.length === 0) {
                callback(null, result);
                return;
            }
            const currFn = fns.pop();
            currFn(await result, (err, newResult) => {
                if (err !== null) {
                    return callback(err);
                }
                recursion(newResult, callback)
            });
        }
        recursion(...args);
    }    
}

const composed = compose([cube, double, subtract5]);

composed(8, (err, result) => {
    console.log(err, result);
});
