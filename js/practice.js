const arr = [1, 2, 3];
const arrNew = arr.map((x) => x + 2);
console.log(arrNew);

const arrNewfor = arr.forEach((x) => console.log(x));
console.log(arrNewfor);

//forEach doesn't returns anything
//you cannot chain anything in foreach

Array.prototype.customMap = function (callback) {
  let opArray = [];
  for (let i = 0; i < this.length; i++) {
    let tempres = callback(this[i]);
    if (tempres) {
      opArray.push(tempres);
    }
  }
  return opArray;
};

const arrNew1 = arr.customMap((x) => x + 3);
console.log(arrNew1);

const arr2 = [1, 2, 3];
const arrfilter1 = arr.filter((x) => x % 2 === 0);
console.log(arrfilter1);

Array.prototype.customFilter = function (callback) {
  let opArray = [];
  for (let i = 0; i < this.length; i++) {
    const op = callback(this[i]);
    if (op) {
      opArray.push(this[i]);
    }
  }
  return opArray;
};

const arrfilter2 = arr.customFilter((x) => x % 2 === 0);
console.log(arrfilter2);

const arr3 = [1, 2, 3];
const arrReduce1 = arr3.reduce((x, y) => x + y);
console.log(arrReduce1);

Array.prototype.customReduce = function (callback, initialValue) {
  let result = initialValue;
  for (let i = 0; i < this.length; i++) {
    if (result) {
      result = callback(this[i], result);
    } else {
      result = this[i];
    }
  }
  return result;
};
const arr33 = [1, 2, 4];
const arrReduce2 = arr33.customReduce((x, y) => x + y);
console.log(arrReduce2);

let s = [
  { name: "hhhhh1", mark: 89 },
  { name: "hhssh2", mark: 59 },
  { name: "hhssh3", mark: 99 }
];

//return names in caps
const res = s.map((x) => x.name.toUpperCase());
console.log(res);

//return only those scored more than 60
const res1 = s.filter((x) => x.mark > 60).map((x) => x.name);
console.log(res1);

//sum of marks of all students
const res2 = s.map((x) => x.mark).reduce((x, y) => x + y);
console.log(res2, s);

//first class functions

function sqr(x) {
  return x * x;
}

function print(fn) {
  // return `${fn(5)} is the sum`;
  return (function (y) {
    // console.log(x);
    console.log(y);
  })(11);
}
// console.log(print(sqr));

(function () {
  console.log("hi im iife");
})();

(function group() {
  console.log("hi group im iife");
})();

(function (x) {
  return (function (y) {
    console.log(x); //has the access to its parent variable bcs of closure
    console.log(y);
  })(11);
})(1);

function add(num1, num2, callback) {
  let sum = num1 + num2;
  return callback(sum);
}

function print1(num) {
  console.log(num);
}

add(1, 2, print1);

//arrow function doesnt have their own bindings
let obj = {
  name: "gayathri",
  greet: function () {
    console.log(this.name);
  },
  welcome: () => console.log(this)
};

obj.greet();
obj.welcome();

var addSix = createBaseFunction(6);
let op1 = addSix(10); //16
let op2 = addSix(6); //12
console.log(op1, op2);

function createBaseFunction(num1) {
  let base = num1;
  return function (num2) {
    return num2 + base;
  };
}

function find(index) {
  let a = [];
  for (let i = 0; i < 1000; i++) {
    a[i] = i * i;
  }
  console.log(a[index]);
}
// console.time("6");
find(6);
find(12);

function findopt() {
  let a = [];
  for (let i = 0; i < 1000; i++) {
    a[i] = i * i;
  }
  return function (index) {
    console.log(a[index]);
  };
}
let fn = findopt();
fn(6);
fn(12);

function counter() {
  let _count = 0;
  function increment(incCount) {
    _count += incCount;
  }
  function getValue() {
    // return _count;
    console.log(_count);
  }
  return { increment, getValue };
}

let privateCounter = counter();
privateCounter.getValue();
privateCounter.increment(5);
privateCounter.getValue();

function getView() {
  let called = 0;
  // view = "hi";
  // console.log(view);
  return function () {
    if (called === 0) {
      called += 1;
      return "Hi for once";
    } else {
      return "None";
    }
  };
}

const getViewObj = getView();
console.log(getViewObj());
console.log(getViewObj());

function add80ToN(n) {
  console.log("In fun");
  return 80 + n;
}

console.log(add80ToN(6));
console.log(add80ToN(6));

function add80ToNUsingMemomized() {
  console.log("In fun MEMORY");
  let cache = {};
  return function (n) {
    if (n in cache) {
      return cache[n];
    } else {
      cache[n] = 80 + n;
      return cache[n];
    }
  };
}

const add80ToNUsingMemomizedObj = add80ToNUsingMemomized();

console.log(add80ToNUsingMemomizedObj(6));
console.log(add80ToNUsingMemomizedObj(6));

function printAB(a, b) {
  console.log(a, b);
}

function printACurrying(a) {
  return function printBCurrying(b) {
    console.log(a, b);
  };
}

printAB(5, 6);
printACurrying(5)(8);

//sum(2)(8)(6)

function sum(a) {
  return function (b) {
    return function (c) {
      return console.log(a + b + c);
    };
  };
}
sum(2)(8)(6);

//evaluate("add")(2)(3)
//evaluate("sub")(2)(3)


function evaluate(opn){
  return function(num1){
    return function(num2){
        if(opn==="add"){
          return console.log(num1+num2);
        }
        else{
          return console.log(num1-num2);
        }
    }
  }
}

evaluate("add")(2)(3)
evaluate("sub")(2)(3)


//Infinite currying addInf(2)(3)...(n)

function addInf(a){
  return function(b){
    if (b){
      return addInf(a+b);
    }else{
      return a;
    }
  }
}

let nums= {
  a:100, b:200, c:"hjjk"
}
let sum1=0
for(let key in nums){
  if((typeof nums[key])  === 'number'){
    sum1+=nums[key]
  }
}
console.log(sum1)

console.log(nums)
console.log(JSON.stringify(nums))
// console.log(JSON.parse("{"a":100,"b":200,"c":"hjjk"}"))

console.log(..."HJK")


const { a:myA } = nums;
console.log(myA)



// let s=["ssss", "bbbb"]
// console.log("HI");
// let s = ["ssss", "bbbbbb", "abc"];

const resArray = s.map( x => {
   let res = new Set(x.split(""));
   console.log(res,x, res.length);
   if(res.size === x.length){
     return true;
   }else{
     return false;
   }
})

// console.log(resArray);