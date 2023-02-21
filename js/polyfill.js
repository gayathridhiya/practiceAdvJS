Array.prototype.customMap = function( evalfun ){
    let opArray = [];
    for(let i=0; i<this.length; i++){
        const op = evalfun(this[i], i)
        if(op){
            opArray.push(op);
        }
    }
    return opArray
}
// arr = [1,2,3,4]
// arr.customMap( x => x+2)
// (4) [3, 4, 5, 6]
// arr.map( x => x+2 ) 
// (4) [3, 4, 5, 6]


//General binding

function getName(name){
    console.log("name" + name)
}

let obj2 = {
    name : "Rani"
}

const getNameFromObj2 = getName.bind(obj2, obj2.name);
getNameFromObj2();
'Rani'

Function.prototype.myBind = function(newObj, ...args1){
    const oldThis = this;
    return function(newObj, ...args2){
        oldThis.apply(newObj,[...args1,...args2]);  //if i directly use this here - i will loose my scope
    }
}

const printBind6 = printInfo.myBind(obj2, obj2.name)
printBind6()



const arr = [1, 2, 3];
const arrNew = arr.map((x) => x + 2);
console.log(arrNew);

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

        