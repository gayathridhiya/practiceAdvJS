// function PromisePolyFill(executor) {
//   let onfulfilled;   //cb fns
//   let onrejected;

//   let isFulfilled = false;
//   let isRejected = false; 

//   let isCalledAtleastOnce = false;
//   let value;


//   this.then = function (callback) {
//     //for async
//     onfulfilled = callback;

//     //for sync

//     if (isFulfilled && !isCalledAtleastOnce) {
//       isCalledAtleastOnce = true;
//       onfulfilled(value); // for sync directly call here
//     }
//     return this;
//   };

//   this.catch = function (callback) {
//     //async
//     onrejected = callback;

//     //sync
//     if (isRejected && !isCalledAtleastOnce) {
//       isCalledAtleastOnce = true;
//       onrejected(value);
//     }
//     return this;
//   };

//   function resolve(val) {
//     isFulfilled = true;
//     value = val;

//     if (typeof onfulfilled == "function") {
//       onfulfilled(val); //attaching value to then's callback
//       isCalledAtleastOnce = true;
//     }
//   }

//   function reject(errorMsg) {
//     isRejected = true;
//     value = errorMsg;
//     if (typeof onrejected == "function") {
//       onrejected(errorMsg);
//       isCalledAtleastOnce = true;
//     }
//   }
//   try {
//     executor(resolve, reject); // call the executor callback with resolve an d reject fn callbacks
//   } catch (err) {
//     reject(err);
//   }
// }

class PromisePolyFill {
    constructor(executor) {
      this.status = "pending";
      this.value = undefined;
      this.reason = undefined;
      this.onFulfilledCallbacks = [];
      this.onRejectedCallbacks = [];
  
      const resolve = (value) => {
        if (this.status === "pending") {
          this.status = "fulfilled";
          this.value = value;
          this.onFulfilledCallbacks.forEach((callback) => callback(this.value));
        }
      };
  
      const reject = (reason) => {
        if (this.status === "pending") {
          this.status = "rejected";
          this.reason = reason;
          this.onRejectedCallbacks.forEach((callback) => callback(this.reason));
        }
      };
  
      try {
        executor(resolve, reject);
      } catch (error) {
        reject(error);
      }
    }
  
    then(onFulfilled, onRejected) {
      const promise = new PromisePolyFill((resolve, reject) => {
        if (this.status === "fulfilled") {
          try {
            const result = onFulfilled(this.value);
            if (result instanceof PromisePolyFill) {
              result.then(resolve, reject);
            } else {
              resolve(result);
            }
          } catch (error) {
            reject(error);
          }
        } else if (this.status === "rejected") {
          try {
            const result = onRejected(this.reason);
            if (result instanceof PromisePolyFill) {
              result.then(resolve, reject);
            } else {
              resolve(result);
            }
          } catch (error) {
            reject(error);
          }
        } else {
          this.onFulfilledCallbacks.push((cb) => {
            try {
              const result = onFulfilled(cb);
              if (result instanceof PromisePolyFill) {
                result.then(resolve, reject);
              } else {
                resolve(result);
              }
            } catch (error) {
              reject(error);
            }
          });
          this.onRejectedCallbacks.push((cb) => {
            try {
              const result = onRejected(cb);
              if (result instanceof Promise) {
                result.then(resolve, reject);
              } else {
                resolve(result);
              }
            } catch (error) {
              reject(error);
            }
          });
        }
      });
  
      return promise;
    }
  
    catch(onRejected) {
      return this.then(null, onRejected);
    }
  
    static resolve(value) {
      return new PromisePolyFill((resolve) => {
        resolve(value);
      });
    }
  
    static reject(reason) {
      return new PromisePolyFill((resolve, reject) => {
        reject(reason);
      });
    }
  
    static all(promises) {
      return new PromisePolyFill((resolve, reject) => {
        const results = [];
        let count = 0;
  
        for (let i = 0; i < promises.length; i++) {
          promises[i].then(   // in this case, promise state is pending, so will push in cb array
            (value) => {
              results[i] = value;
              count++;
  
              if (count === promises.length) {
                resolve(results);
              }
            },
            (reason) => {
              reject(reason);
            }
          );
        }
      });
    }
  
    // static race(promises) {
    //   return new PromisePolyFill((resolve, reject) => {
    //     for (let i = 0; i < promises.length; i++) {
    //       promises[i].then(
    //         (value) => {
    //           resolve(value);
    //         },
    //         (reason) => {
    //           reject(reason);
    //         }
    //       );
    //     }
    //   });
    // }

    static race(promiseArray){
        return new PromisePolyFill((resolve,reject) => {
            for(let i=0;i<promiseArray.length;i++){
                promiseArray[i].then(
                    (val) => resolve(val)
                )
            }
        })
    }
  }
  
  
//   const p = new PromisePolyFill((resolve, reject) => {
//     setTimeout(() => resolve(2), 1000);
//     // resolve(10)
//     console.log("hi")
//   });
  
  // p.then( (msg) => {
  //   console.log(msg)
  // });
  
//   p.then(function thenCallBack(promiseReturnedData) {
//     console.log(promiseReturnedData);
//     //can return new promise/value/error
//     return new PromisePolyFill( resolve => resolve(50))

//   });

  PromisePolyFill.all([
    new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
    new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
    new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
  ]).then( res => console.log(res))

  PromisePolyFill.race([
    new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
    new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
    new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
  ]).then( res => console.log(res))



  
  //1)  Promise accepts a
  //@param executor - A callback used to initialize the promise.
  //This callback is passed with two arguments: a resolve callback used to resolve the promise with a value or the result of another promise,
  //and a reject callback used to reject the promise with a provided reason or error.
  
  // 2) .then() -
  //input - callback
  //@param onfulfilled — callback to execute when the Promise is resolved.
  //@param onrejected — callback to execute when the Promise is rejected.
  //@returns — A Promise for the completion of which ever callback is executed.
  
  //3) .catch () - @param onrejected — callback to execute when the Promise is rejected.
  //@returns — A Promise for the completion of the callback.
  
  //4)resolve
  //(parameter) resolve: (value: any) => void
  
  //5) reject
  //reject(reason?: any): void
  