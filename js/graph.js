class Graph {
    constructor() {
      this.adjacencyList = [];
    }
    addVertex(v) {
      if (this.adjacencyList[v] === undefined) {
        this.adjacencyList[v] = new Set();
      }
    }
    addEdgeConnection(v1, v2) {
      this.addVertex(v1);
      this.addVertex(v2);
      this.adjacencyList[v1].add(v2);
      this.adjacencyList[v2].add(v1);
    }
    printGraph() {
      for (let v in this.adjacencyList) {
        console.log(`${v} -> ${[...this.adjacencyList[v]]}`);
      }
    }
  }
  
  let g = new Graph();
  g.addEdgeConnection("A", "B");
  g.addEdgeConnection("B", "C");
  g.printGraph();
  