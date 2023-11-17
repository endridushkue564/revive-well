/**
 * Filename: complexCode.js
 * 
 * Description:
 * 
 * This code demonstrates a complex implementation of a network graph data structure using JavaScript.
 * It includes classes for nodes and edges, as well as various graph algorithms like Dijkstra's shortest path,
 * Breadth-First Search, and Depth-First Search. The code also includes functions for creating, manipulating,
 * and querying the graph.
 * 
 * The code is organized as follows:
 *  - Node and Edge classes
 *  - Graph class
 *  - Graph Algorithms (Dijkstra's, BFS, DFS)
 *  - Helper functions for graph manipulation
 *  - Main code for creating and using the graph
 */
 
// Node class represents a node in the graph
class Node {
  constructor(id) {
    this.id = id;
    this.edges = [];
  }
  
  addEdge(edge) {
    this.edges.push(edge);
  }
  
  removeEdge(edge) {
    const index = this.edges.indexOf(edge);
    if (index > -1) {
      this.edges.splice(index, 1);
    }
  }
}

// Edge class represents an edge between two nodes
class Edge {
  constructor(node1, node2, weight) {
    this.node1 = node1;
    this.node2 = node2;
    this.weight = weight;
    
    node1.addEdge(this);
    node2.addEdge(this);
  }
}

// Graph class represents the graph structure
class Graph {
  constructor() {
    this.nodes = new Map();
  }
  
  addNode(id) {
    if (!this.nodes.has(id)) {
      this.nodes.set(id, new Node(id));
    }
  }
  
  removeNode(id) {
    const node = this.nodes.get(id);
    if (node) {
      for (const edge of node.edges) {
        const neighborNode = edge.node1 === node ? edge.node2 : edge.node1;
        neighborNode.removeEdge(edge);
      }
      this.nodes.delete(id);
    }
  }
  
  addEdge(nodeId1, nodeId2, weight) {
    const node1 = this.nodes.get(nodeId1);
    const node2 = this.nodes.get(nodeId2);
    if (node1 && node2) {
      new Edge(node1, node2, weight);
    }
  }
  
  removeEdge(nodeId1, nodeId2) {
    const node1 = this.nodes.get(nodeId1);
    const node2 = this.nodes.get(nodeId2);
    if (node1 && node2) {
      for (const edge of node1.edges) {
        if ((edge.node1 === node1 && edge.node2 === node2) ||
            (edge.node1 === node2 && edge.node2 === node1)) {
          node1.removeEdge(edge);
          node2.removeEdge(edge);
          break;
        }
      }
    }
  }
  
  // ... more graph manipulation functions ...
}

// Graph Algorithms

function dijkstra(graph, startNodeId) {
  const distances = new Map();
  const previous = new Map();
  const unvisited = new Set();
  
  for (const node of graph.nodes.values()) {
    distances.set(node.id, Infinity);
    previous.set(node.id, null);
    unvisited.add(node);
  }
  
  distances.set(startNodeId, 0);
  
  while (unvisited.size > 0) {
    const current = getNodeWithMinimumDistance(distances, unvisited);
    unvisited.delete(current);
    
    for (const edge of current.edges) {
      const neighbor = edge.node1 === current ? edge.node2 : edge.node1;
      const altDistance = distances.get(current.id) + edge.weight;
      if (altDistance < distances.get(neighbor.id)) {
        distances.set(neighbor.id, altDistance);
        previous.set(neighbor.id, current);
      }
    }
  }
  
  return { distances, previous };
}

function getNodeWithMinimumDistance(distances, unvisited) {
  let minDistance = Infinity;
  let minNode = null;
  for (const node of unvisited) {
    const distance = distances.get(node.id);
    if (distance < minDistance) {
      minDistance = distance;
      minNode = node;
    }
  }
  return minNode;
}

function breadthFirstSearch(graph, startNodeId) {
  const visited = new Set();
  const queue = [];
  
  visited.add(startNodeId);
  queue.push(startNodeId);
  
  while (queue.length > 0) {
    const currentId = queue.shift();
    const currentNode = graph.nodes.get(currentId);
    
    // Process current node
    console.log("Visiting node:", currentId);
    
    for (const edge of currentNode.edges) {
      const neighbor = edge.node1 === currentNode ? edge.node2 : edge.node1;
      if (!visited.has(neighbor.id)) {
        visited.add(neighbor.id);
        queue.push(neighbor.id);
      }
    }
  }
}

function depthFirstSearch(graph, startNodeId) {
  const visited = new Set();
  
  dfsVisit(graph, startNodeId, visited);
}

function dfsVisit(graph, nodeId, visited) {
  visited.add(nodeId);
  
  const node = graph.nodes.get(nodeId);
  // Process current node
  console.log("Visiting node:", nodeId);
  
  for (const edge of node.edges) {
    const neighbor = edge.node1 === node ? edge.node2 : edge.node1;
    if (!visited.has(neighbor.id)) {
      dfsVisit(graph, neighbor.id, visited);
    }
  }
}

// Helper functions for graph manipulation

// ... more helper functions ...

// Main code

// Creating a graph
const graph = new Graph();

// Adding nodes
graph.addNode(1);
graph.addNode(2);
graph.addNode(3);
graph.addNode(4);
graph.addNode(5);

// Adding edges
graph.addEdge(1, 2, 3);
graph.addEdge(1, 3, 5);
graph.addEdge(2, 3, 2);
graph.addEdge(2, 4, 1);
graph.addEdge(3, 4, 2);
graph.addEdge(4, 5, 4);
graph.addEdge(3, 5, 6);

// Removing an edge
graph.removeEdge(3, 5);

// Removing a node
graph.removeNode(4);

// Applying graph algorithms

// Dijkstra's shortest path from node 1
const { distances, previous } = dijkstra(graph, 1);
console.log("Distances:", distances);
console.log("Previous:", previous);

// Breadth-First Search from node 1
breadthFirstSearch(graph, 1);

// Depth-First Search from node 1
depthFirstSearch(graph, 1);
... // more code
