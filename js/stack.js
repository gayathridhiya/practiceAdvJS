class Stack {
    constructor() {
      this.items = [];
    }
    push(element) {
      return this.items.push(element);
    }
  
    pop() {
      return this.items.pop();
    }
  
    peek() {
      return this.items[-1];
    }
  
    size() {
      return this.items.length;
    }
  
    isEmpty() {
      return this.items.length === 0;
    }
  
    print() {
      this.items.map((x) => console.log(x));
    }
  }
  
  let stack = new Stack();
  stack.push(1);
  stack.push("345");
  stack.push(98,980);
  stack.push(78)
  stack.pop();
  stack.print();
  