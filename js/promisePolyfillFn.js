function PromisePolyFill(executor) {
    let onfulfilled;   //cb fns
    let onrejected;
  
    let isFulfilled = false;
    let isRejected = false; 
  
    let isCalledAtleastOnce = false;
    let value;
  
  
    this.then = function (callback) {
      //for async
      onfulfilled = callback;
  
      //for sync
  
      if (isFulfilled && !isCalledAtleastOnce) {
        isCalledAtleastOnce = true;
        onfulfilled(value); // for sync directly call here
      }
      return this;
    };
  
    this.catch = function (callback) {
      //async
      onrejected = callback;
  
      //sync
      if (isRejected && !isCalledAtleastOnce) {
        isCalledAtleastOnce = true;
        onrejected(value);
      }
      return this;
    };
  
    function resolve(val) {
      isFulfilled = true;
      value = val;
      
      if (typeof onfulfilled == "function") {
        onfulfilled(val); //attaching value to then's callback
        isCalledAtleastOnce = true;
      }
    }
  
    function reject(errorMsg) {
      isRejected = true;
      value = errorMsg;
      if (typeof onrejected == "function") {
        onrejected(errorMsg);
        isCalledAtleastOnce = true;
      }
    }
    try {
      executor(resolve, reject); // call the executor callback with resolve an d reject fn callbacks
    } catch (err) {
      reject(err);
    }
  }
  
  const p = new PromisePolyFill((resolve, reject) => {
    setTimeout(() => resolve(2), 1000);
  });
  
  // p.then( (msg) => {
  //   console.log(msg)
  // });
  
  p.then(function thenCallBack(promiseReturnedData) {
    console.log(promiseReturnedData);
    //can return new promise/value/error
  });
  
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
  