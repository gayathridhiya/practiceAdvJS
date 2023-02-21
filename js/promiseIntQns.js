// const promise1 = new Promise((resolve) => resolve("hi"));
// const promise2 = new Promise((resolve) => resolve("hello"));

// const promiseFn = Promise.resolve("hi i am promisefn");
// //console.log(promise1, promiseFn);

// const promise3 = new Promise((resolve) => {
//   setTimeout(() => resolve("hello i im timed"), 3000);
// });

// const promiseFn2 = Promise.resolve(promise3);
// //console.log(typeof promise1, typeof promiseFn);

// promiseFn2
//   .then((msgFromPromise) => {
//     console.log(msgFromPromise);
//     return msgFromPromise;
//   })
//   .then((res) => console.log(res));

//   function delay(ms) {
//     return new Promise((resolve,reject) => {
//       setTimeout(()=> resolve(),ms)
//     })
//   }

//   delay(2000).then(() => alert('runs after 3 seconds'));

// new Promise(function(resolve, reject) {
//   setTimeout(() => {
//     throw new Error("Whoops!");
//   }, 1000);

// const p1 = new Promise(function (resolve, reject) {
//   // throw new Error("Whoops!");
//   resolve("hi");
//   console.log("456");
//   resolve("bye");
//   console.log("4567");
//   // setTimeout(() => {
//   //   throw new Error("Whoops!");
//   // }, 1000);
// });
// p1.finally(() => console.log("finally")).then((msg) =>
//   console.log("thn msg", msg)
// );
// // p1.catch(alert);

// function f1() {
//   console.log("hi");
//   //
// }

// f1();

function promisefn(val) {
    return new Promise((resolve, reject) => {
      if (val === true) {
        resolve("Hi resolved");
      } else {
        reject("Helllo rejected");
      }
    });
  }
  
  let p = promisefn(true);
  
  p.then((msg) => {
    console.log("then 1", msg);
    // throw new Error("bye");
    return promisefn(true);
  })
    .finally(() => {
      console.log("finally");
    })
    .then((data) => {
      console.log("then 2", data);
    })
    .catch((err) => {
      console.log(err);
    })
    .then((data) => {
      console.log("then 3", data);
    });
  
  
  
  
  