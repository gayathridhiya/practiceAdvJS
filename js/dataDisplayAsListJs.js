import { data } from "./data/data.js";

// console.log(data);

const treeData = data;

function createTree(obj) {
  if (!Object.keys(obj).length) {
    return " ";
  }
  let list = "<ol>";
  for (let key in obj) {
    list += "<li>" + key + createTree(obj[key]) + "</li>";
    console.log(obj[key]);
    // return createTree(obj[key]);
  }

  list += "</ol>";
  return list;
}
let op = createTree(treeData);

document.getElementById("app").append(document.write(op));



//data:

// export const data = {
//     Fish: {
//       trout: {},
//       salmon: {}
//     },
  
//     Tree: {
//       Huge: {
//         sequoia: {},
//         oak: {}
//       },
//       Flowering: {
//         "apple tree": {},
//         magnolia: {}
//       }
//     }
//   };
  
