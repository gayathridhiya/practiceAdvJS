class Queue {
    constructor() {
      this.items = [];
    }
    enqueue(element) {
      return this.items.push(element);
    }
  
    dequeue() {
      return this.items.shift();
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
  
  let q = new Queue();
  q.enqueue(1);
  q.enqueue("345");
  q.enqueue(98, 980);
  q.enqueue(78);
  q.dequeue();
  q.print();
  