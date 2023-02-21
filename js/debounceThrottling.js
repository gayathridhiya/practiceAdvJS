import "./styles.css";
import _ from "lodash";

let btn = document.querySelector(".buttonDiv");
let btnPressed = document.querySelector(".buttonPressed");
let btnDebounced = document.querySelector(".buttonDebounced");
let btnthrottled = document.querySelector(".buttonthrottled");

var pressedCount = 0;
var triggerCount = 0;
var throttleIncCount = 0;

btn.addEventListener("click", () => {
  btnPressed.innerHTML = ++pressedCount;
  debouncedCount();
  throttledCount();
});

// const debouncedCount = _.debounce(() => {
//   btnDebounced.innerHTML = ++triggerCount;
// }, 500);

const debouncedCount = debouncePolyfill(() => {
  btnDebounced.innerHTML = ++triggerCount;
}, 1500);

// const throttledCount = _.throttle(() => {
//   btnthrottled.innerHTML = ++throttleIncCount;
// }, 1000);

const throttledCount = throttlePolyfill(() => {
  btnthrottled.innerHTML = ++throttleIncCount;
}, 500);

function debouncePolyfill(cb, delay) {
  let timer;
  return function (...arg) {
    if (timer) clearTimeout(timer);
    setTimeout(() => cb(...arg), delay);
  };
}

function throttlePolyfill(cb, delay) {
  let lastTime = 0;
  return function (...arg) {
    let currTime = new Date().getTime();
    let diff = currTime - lastTime;
    if (diff < delay) return;
    lastTime = currTime;
    return cb(...arg);
  };
}
