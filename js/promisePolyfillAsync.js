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
          // [ fn1(msg), fn2(msg) , (msg) => console.log(msg)]
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
  }
  
  const p1 = new PromisePolyfill((resolve, reject) => {
    console.log("Hi p1");
  
    setTimeout(() => resolve(45));
  });
  
  p1.then((x) => console.log(x));
  