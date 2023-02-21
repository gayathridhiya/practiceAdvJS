//container with water
var maxArea = function(height) {
    let left = 0
    let right = height.length - 1
    let arr = []
    
    while (left < right){
        currArea = 0
        if (height[left] < height[right]){
            currArea = height[left] * (right-left);
            arr.push(currArea);
            left+=1;
            console.log(currArea)
        }
        else{
            currArea = height[right] * (right-left);
            arr.push(currArea);
            console.log(currArea,right)
            right-=1;
        }
        
    }
    console.log(arr)
    return Math.max(...arr); 
};


//reverse linked list

//  1 2000 2 3000 3 null

//  1 null 2 1000 3 2000

var reverseList = function(head) {

    let currNode = head
    let prev = null;

    while(currNode){
        let actualNext = currNode.next;
        currNode.next = prev;

        prev = currNode;
        currNode =  actualNext;
    }

    return prev
    
};

//a happy number:

var isHappy = function(n) {
    let seen = {};
    
    while(n!==1 && !seen[n]){
        let numArray = String(n).split("").map( x => Number(x)**2)  //"19" ["1","9"] [1,9] [1,81]
        let sum = numArray.reduce((a,b) => a+b)  //82
        seen[n] = sum;
        n = sum;
    }
//     console.log(seen)
    // for 1: { '19': 82, '68': 100, '82': 68, '100': 1 } true
//     for 2: {
//   '2': 4,
//   '4': 16,
//   '16': 37,
//   '20': 4,
//   '37': 58,
//   '42': 20,
//   '58': 89,
//   '89': 145,
//   '145': 42
// } false

    return n===1? true:false;
};

//2 sum
//https://leetcode.com/problems/two-sum/description/


var twoSum = function(nums, target) {
    for(let i = 0; i<nums.length ; i++){
        let idx = nums.findIndex(x => x===(target - nums[i]))
        if(idx !== i && idx!== -1){
            return [idx,i]
        }
    }
};


//climbing stairs = fibonacci series
var climbStairs = function(n) {
    let mem = {};
    mem[0]=0;
    mem[1]=1;
    for(let i=2;i<=n+1;i++){
        mem[i]=mem[i-1]+mem[i-2];
    }
    return mem[n+1];
};


//good time to buy and sell stocks

//  [7,1,5,3,6,4]
//  buy = 7  1  -  -  - -
//  sell = 7  1  5  -  6 -

// [3,2,6,5,0,3]
// buy   3  2  -  -  0  
// sell  3  2  6  -  0
//profit 0  0  4  -  0

// if cheap price, you buy + sell, else only sell. return max profit array 
 
 
var maxProfit = function(prices) {
    let minbuy = prices[0]
    let maxsell = prices[0];
    let profit = maxsell - minbuy;
    let profitArray = [profit];

    for(let i = 0; i < prices.length;i++){
        if(prices[i] < minbuy){
            minbuy = prices[i]
            maxsell = prices[i]
        }
        if( prices[i] > maxsell){
            maxsell = prices[i]
        }
        profitArray.push(maxsell - minbuy)
    }
    // console.log(profitArray)
    return Math.max(...profitArray)
};


// Use a stack of characters
// When you encounter an opening bracket, push it to the top of the stack.
// When you encounter a closing bracket, check if the top of the stack was the opening for it. If yes, pop it from the stack. Otherwise, return false.


const pairs = {
    "(": ")",
    "[": "]",
    "{": "}"
}
     
var isValid = function(s) {
    
    // check if length is an odd number. if it is, return false
    // if there is an odd number, it means that at least one bracket is missing a pair
    if (s.length % 2 === 1) return false
    
    // if the first element is a closing bracket, it doesn't matter what follows
    // it will never have a pair
    if (s[0] === "]" || s[0] === ")" || s[0] === "}") return false
    
    // same goes for last element, we are just dealing with opening bracket
    if (s[s.length - 1] === "[" || s[s.length - 1] === "(" || s[s.length - 1] === "{") return false
    
    
    let stack = []
    
    for(let i=0; i<s.length; i++) {
        // if it's an opening bracket, push into stack
        // else, assume it's closing bracket and check if it matches anything
        if(s[i] === "[" || s[i] === "(" || s[i] === "{") {
            stack.push(s[i])
        } else if (pairs[stack.pop()] !== s[i]) {
            return false
        }
        
    }
    return stack.length === 0
    
};
