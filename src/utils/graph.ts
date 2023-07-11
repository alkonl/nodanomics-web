import {INodeData} from "../interface";

class Node {
    value: INodeData;
    neighbors: Node[];

    constructor(value: INodeData) {
        this.value = value;
        this.neighbors = [];
    }

    addNeighbor(node: Node) {
        this.neighbors.push(node);
    }

    findNeighbor(id: string) {
        return this.neighbors.find(node => node.value.id === id);
    }
}

export class Graph {
    nodes: Node[];

    constructor() {
        this.nodes = [];
    }

    addNode(value: INodeData) {
        const node = new Node(value);
        this.nodes.push(node);
        console.log('Graph', this);
    }

    addEdge(source: Node, destination: Node) {
        source.addNeighbor(destination);
        destination.addNeighbor(source);
    }

    findNode(id: string) {
        return this.nodes.find(node => node.value.id === id);
    }

    updateNodeData(id: string, data: Partial<INodeData>) {
        const node = this.findNode(id);
        console.log('updateNodeData|node: ', {id, node})
        if (node) {
            node.value = {
                ...node.value,
                ...data
            }
        }
    }
}

export function bfs(startNode: Node) {
    const visited: Set<Node> = new Set();
    const queue: Node[] = [];

    visited.add(startNode);
    queue.push(startNode);

    while (queue.length > 0) {
        const currentNode = queue.shift()!;
        console.log(currentNode.value);

        for (const neighbor of currentNode.neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
}
