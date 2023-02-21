class TreeNode {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  }
  class BST {
    constructor() {
      this.root = null;
    }
    insertNode(node) {
      if (this.root === null) {
        this.root = node;
      } else {
        this.addNode(this.root, node);
      }
    }
    addNode(root, node) {
      //10
      //5  20
      //L:check 10 {10<ele}, if left is null add , else check 5
      //R:check 10, {10>ele}, if right is null add, else check right
  
      if (root.data > node.data) {
        if (root.left === null) {
          root.left = node;
          return;
        } else {
          this.addNode(root.left, node);
        }
      } else {
        if (root.right === null) {
          root.right = node;
          return;
        } else {
          this.addNode(root.right, node);
        }
      }
    }
    printBST(root) {
      //PLR - PreOrder, LRP - postorder, LPR - inorder - DFS
      if (!root) {
        return;
      }
      console.log(root.data);
      this.printBST(root.left);
      this.printBST(root.right);
    }
  
    searchAnElementInBST(element, currRoot = this.root) {
      if (!currRoot) {
        return -1;
      }
      if (currRoot.data === element) {
        // console.log("found");
        return 1;
      }
      if (currRoot.data > element) {
        return this.searchAnElementInBST(element, currRoot.left);
      } else {
        return this.searchAnElementInBST(element, currRoot.right);
      }
    }
  
    bfs() {
      let currRoot = this.root;
      const queue = [];
      queue.push(currRoot);
  
      while (queue.length) {
        let currFirstNodeInQueue = queue.shift();
        console.log(currFirstNodeInQueue.data,"BFS")
        if (currFirstNodeInQueue.left !== null) {
          queue.push(currFirstNodeInQueue.left);
          // console.log("queue here",queue[0])
        }
        if (currFirstNodeInQueue.right) {
          queue.push(currFirstNodeInQueue.right);
        }
        // console.log("queue",queue)
      }
    }
  
    minimum(root=this.root){
      //left most child
      if(!root){
        return -1
      }
      if(root.left===null){
        return root.data;
      }
      return this.minimum(root.left);
    }
  
    maximum(root=this.root){
      //right most child - leaft node
      if(!root){
        return -1
      }
      if(root.right===null){
        return root.data;
      }
      return this.maximum(root.right);
    }
  }
  
  let node1 = new TreeNode(10);
  let node2 = new TreeNode(5);
  let node3 = new TreeNode(15);
  let node4 = new TreeNode(3);
  let node5 = new TreeNode(7);
  
  let bst = new BST();
  
  bst.insertNode(node1);
  bst.insertNode(node2);
  bst.insertNode(node3);
  bst.insertNode(node4);
  bst.insertNode(node5);
  
  bst.printBST(node1);
  let foundStatus = bst.searchAnElementInBST(15);
  let foundStatus1 = bst.searchAnElementInBST(90);
  console.log(foundStatus, foundStatus1);
  
  bst.bfs();
  
  console.log(bst.minimum());
  console.log(bst.maximum());
  