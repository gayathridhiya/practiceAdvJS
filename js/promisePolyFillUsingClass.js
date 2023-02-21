//A polyfill is a piece of code that implements a feature that is not natively supported by the browser

const STATE = {
    FULFILLED: "fulfilled",
    REJECTED: "rejected",
    PENDING: "pending"
};

class PromisePolyfill {
    constructor(executor) {
        this.state = STATE.PENDING;
        this.value = undefined;
        this.reason = undefined;

        this.successCallBacks = [];
        this.failedCallBacks = [];

        const resolve = (value) => {
            if (this.state === STATE.PENDING) {
                this.state = STATE.FULFILLED;
                this.value = value;
                // [ (resolvedVal) => {
                //   const result = onfulfilledCallBack(resolvedVal);
                //   if (result instanceof PromisePolyfill) {
                //     result.then(resolve, reject);
                //   } else {
                //     resolve(result);
                //   }
                // },
                // fn2(msg) ]
                this.successCallBacks.forEach((cb) => {
                    console.log(cb);
                    return cb(this.value);
                });
            }
        };

        const reject = (reason) => {
            if (this.state === STATE.PENDING) {
                this.state = STATE.REJECTED;
                this.reason = reason;
                // [ fn1(reason), fn2(reason) , (Errmsg) => console.log(Errmsg)]
                this.failedCallBacks.forEach((cb) => {
                    return cb(this.reason);
                });
            }
        };

        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    then(onfulfilledCallBack, onRejectedCallBack) {
        const promise = new PromisePolyfill((resolve, reject) => {
            //check if sync call eg. resolve(50) is already fulfiled
            if (this.state === STATE.FULFILLED) {
                const result = onfulfilledCallBack(this.value);
                if (result instanceof PromisePolyfill) {
                    result.then(resolve, reject);
                } else {
                    resolve(result);
                }
            } else if (this.state === STATE.REJECTED) {
                const result = onRejectedCallBack(this.reason);
                if (result instanceof PromisePolyfill) {
                    result.then(resolve, reject);
                } else {
                    reject(result);
                }
            } else {
                this.successCallBacks.push((resolvedVal) => {
                    console.log(resolvedVal, typeof onfulfilledCallBack);
                    const result = onfulfilledCallBack(resolvedVal);
                    if (result instanceof PromisePolyfill) {
                        result.then(resolve, reject);
                    } else {
                        resolve(result);
                    }
                });

                this.failedCallBacks.push((rejectedErr) => {
                    const result = onRejectedCallBack(rejectedErr);
                    if (result instanceof PromisePolyfill) {
                        result.then(resolve, reject);
                    } else {
                        reject(result);
                    }
                });
            }
        });
        return promise;
    }

    catch(onRejectedCallBack) {
        return this.then(null, onRejectedCallBack);
    }
    static resolve(value) {
        return new PromisePolyfill((resolve) => resolve(value));
    }
    static all(promiseArray) {
        return new PromisePolyfill((resolve, reject) => {
            const result = [];
            let count = 0;
            for (let i = 0; i < promiseArray.length; i++) {
                console.log("hi");
                promiseArray[i].then((val) => {
                    result[i] = val;
                    count++;
                    if (count === promiseArray.length) {
                        resolve(result);
                    }
                });
            }
        });
    }


    static race(promiseArray) {
        return new PromisePolyfill((resolve, reject) => {
            for (let i = 0; i < promiseArray.length; i++) {
                promiseArray[i].then(
                    (val) => resolve(val),
                    (err) => reject(err)
                )
            }
        })
    }

    //Promise.allSettled() method to handle multiple promises and get the result of each one, regardless of whether they were fulfilled or rejected:

    
    static allSettled(promiseArray) {
        return new PromisePolyfill((resolve, reject) => {
          const result = [];
          let count = 0;
          for (let i = 0; i < promiseArray.length; i++) {
            promiseArray[i]
              .then((val) => {
                result[i] = { status: "fulfilled", value: val };
                count++;
                if (count === promiseArray.length) {
                  resolve(result);
                }
              })
              .catch((err) => {
                result[i] = { status: "rejected", reason: err };
                count++;
                if (count === promiseArray.length) {
                  resolve(result);
                }
              });
          }
        });
      }

      //Promise.any method returns a promise that fulfills as soon as any of the input promises fulfill, or rejects if all the input promises reject.

      static any(promiseArray) {
        return new PromisePolyfill((resolve, reject) => {
            for (let i = 0; i < promiseArray.length; i++) {
                const errorArray = [];
                promiseArray[i].then(
                    (val) => resolve(val))
                    .catch(
                    (err) => { errorArray.push(err);
                        if(errorArray.length===promiseArray.length){
                            console.log("Rejecting all")
                            reject(new AggregateError(errorArray))
                        }
                                
                    }
                )
            }
        })
    }




}

// const p1 = new PromisePolyfill((resolve, reject) => {
//   console.log("Hi p1");

//   setTimeout(() => resolve(45));
// });

// p1.then((x) => console.log(x));
console.log("hi reached");
PromisePolyfill.all([
    new Promise((resolve) => setTimeout(() => resolve(1), 3000)), // 1
    new Promise((resolve) => setTimeout(() => resolve(2), 2000)), // 2
    new Promise((resolve) => setTimeout(() => resolve(3), 1000)) // 3
]).then((res) => console.log(res));

PromisePolyfill.race([
    new Promise((resolve) => setTimeout(() => resolve(1), 3000)), // 1
    new Promise((resolve) => setTimeout(() => resolve(2), 2000)), // 2
    new Promise((resolve) => setTimeout(() => resolve(3), 1000)) // 3
]).then((res) => console.log(res));

PromisePolyfill.any([
    new Promise((resolve,reject) => setTimeout(() => reject(1), 3000)), // 1
    new Promise((resolve,reject) => setTimeout(() => reject(2), 2000)), // 2
    new Promise((resolve,reject) => setTimeout(() => reject(3), 1000)) // 3
]).then((res) => console.log("any", res)).catch( err => console.log("any", err))

PromisePolyfill.allSettled([
    new Promise((resolve) => setTimeout(() => resolve(1), 3000)), // 1
    new Promise((resolve) => setTimeout(() => resolve(2), 2000)), // 2
    new Promise((resolve) => setTimeout(() => resolve(3), 1000)) // 3
]).then((res) => console.log(res));
