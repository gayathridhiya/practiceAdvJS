class Node {
    constructor(data) {
      this.data = data;
      this.next = null;
    }
  }
  class LinkedList {
    constructor() {
      this.head = null;
    }
    insert(node) {
      if (this.head === null) this.head = node;
      else {
        let temp = this.head;
        while (temp.next !== null) {
          temp = temp.next;
        }
        temp.next = node;
      }
    }
    printLL() {
      if (this.head === null) console.log("Empty LL");
      else {
        let temp = this.head;
        while (temp) {
          console.log("temp data", temp.data);
          temp = temp.next;
        }
      }
    }
    size() {
      if (this.head === null) console.log("Empty LL");
      else {
        let temp = this.head;
        let count = 0;
        while (temp) {
          temp = temp.next;
          count++;
        }
        console.log(count);
      }
    }
    reverse() {
      if (this.head === null) console.log("Empty list cannot be reversed");
      else {
        let prev = null;
        // 1 2000 2 3000 3 null
        // 1 null 2 1000 3 2000
        //1000 main focus
        let currNode = this.head;
        while (currNode) {
          let actualNext = currNode.next;
          currNode.next = prev;
  
          prev = currNode;
          currNode = actualNext;
        }
        this.head = prev;
        // this.printLL(prev)
      }
    }
  
    remove(node) {
      if (this.head === "null") console.log("Empty LL cannot be removed");
      else {
        let currNode = this.head;
        while (currNode.next && currNode.next.data !== node.data) {
          currNode = currNode.next;
        }
        // currNode.next = node.next;
        if (currNode.next.next) {
          currNode.next = currNode.next.next;
        } else {
          currNode.next = null;
        }
      }
    }
  
    search(data) {
      if (this.head === "null") console.log("Empty LL cannot be removed");
      else {
        let temp = this.head;
        while (temp) {
          if (temp.data === data) {
            return 1;
          }
          temp = temp.next;
        }
        return -1;
      }
    }
  }
  
  let ll = new LinkedList();
  ll.printLL();
  ll.insert(new Node(3));
  ll.insert(new Node(31));
  ll.insert(new Node(33));
  ll.insert(new Node(93));
  ll.printLL();
  ll.size();
  // ll.reverse();
  // ll.printLL();
  console.log("********");
  ll.remove(new Node(31));
  ll.printLL();
  console.log(ll.search(939));
  