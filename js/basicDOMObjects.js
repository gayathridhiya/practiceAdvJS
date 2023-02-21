import "./styles.css";

//index.html

// <!DOCTYPE html>
// <html>
//   <head>
//     <title>Parcel Sandbox</title>
//     <meta charset="UTF-8" />
//   </head>

//   <body>
//     <div id="app">
//       <li id="appList"></li>
//     </div>

//     <script src="src/index.js"></script>
//   </body>
// </html>

//this file - index.js

document.getElementById("app").innerHTML = `
<h1>Hello!</h1>
<div>
  
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;

let div = document.createElement("div");
div.innerHTML = "<strong>Hi there!</strong> You've read an important message.";
let div2 = document.createElement("div");
div2.innerHTML =
  "<strong>Hi there 2!</strong> You've read an important message.";

document.getElementById("app").append(div);
document.getElementById("app").append(div2);

const arr = ["HI", "Hello", "Arr3"];

let ol = document.createElement("ol");

arr.map((x) => {
  let list = document.createElement("li");
  list.innerHTML = x;
  ol.append(list);
});

document.getElementById("app").append(ol);
