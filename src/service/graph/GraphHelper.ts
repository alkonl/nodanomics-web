import {GraphDataNode, GraphInvokableNode, GraphLoopNode} from "./GraphNodes";
import {GraphChainEdge} from "./GraphEdge";
import {GenericGraphNode} from "./GenericGraphNode";
import {GraphMicroLoopNode} from "./GraphNodes/GraphMicroLoopNode";
import {EConnectionMode} from "../../interface";


export class GraphHelper {
    static findAllRootsOfBranch(node: GenericGraphNode, visited: Set<GenericGraphNode> = new Set()): Set<GenericGraphNode> {
        // If the node has been visited before, return an empty set to prevent infinite loops.
        if (visited.has(node)) return new Set();

        visited.add(node);

        // If the node has no incoming edges, it's a root.
        if (node.incomingEdges.length === 0) {
            return new Set([node]);
        }

        const roots = new Set<GenericGraphNode>();
        for (const edge of node.incomingEdges) {
            const sourceRoots = this.findAllRootsOfBranch(edge.source, visited);
            for (const root of sourceRoots) {
                roots.add(root);
            }
        }

        return roots;
    }

    static shortestDistance(start: GenericGraphNode, end: GenericGraphNode): number | undefined {
        const visited = new Set<GenericGraphNode>();
        const queue: { node: GenericGraphNode, distance: number }[] = [{node: start, distance: 0}];

        while (queue.length > 0) {
            const current = queue.shift();

            if (current) {
                if (current.node === end) {
                    return current.distance;
                }


                visited.add(current.node);

                for (const edge of current.node.outgoingEdges) {
                    if (!visited.has(edge.target)) {
                        queue.push({node: edge.target, distance: current.distance + 1});
                    }
                }
            }

        }

        return undefined
    }

    static longestBranchFromNode(node: GenericGraphNode, visited: Set<GenericGraphNode> = new Set()): number {
        visited.add(node);

        let maxDepth = 0;
        let theLongestBranchIsInner = false
        for (const edge of node.outgoingEdges) {
            let isInnerNode = false
            let skipEdge = false
            if (edge.source instanceof GraphLoopNode) {
                if (edge.source instanceof GraphMicroLoopNode && !edge.source.data.isAccumulative) {
                    isInnerNode = true
                    skipEdge = false
                } else if (edge.sourceMode === EConnectionMode.LoopInnerToChildren) {
                    skipEdge = true
                }
            }

            if (skipEdge) {
                continue
            }
            if (!visited.has(edge.target) && edge instanceof GraphChainEdge) {

                const depth = this.longestBranchFromNode(edge.target, visited);
                if (depth > maxDepth) {
                    maxDepth = depth
                    theLongestBranchIsInner = isInnerNode
                }
            }
        }

        const isMicroLoop = node instanceof GraphMicroLoopNode
        if(theLongestBranchIsInner && isMicroLoop){
           return maxDepth * node.loopCount
        }

        return maxDepth  + 1; // +1 to count the current node
    }

    static findLongestBranch(nodes: GenericGraphNode[]): number {
        let maxLength = 0;
        for (const node of nodes) {
            let compensation = 0
            if (node instanceof GraphInvokableNode) {
                compensation = node.stepExecutionCompensation
            }
            maxLength = Math.max(maxLength, this.longestBranchFromNode(node) + compensation);
        }

        return maxLength;
    }

    static isNodeFurthest(source: GenericGraphNode, target: GenericGraphNode): boolean {
        const distances = new Map<GenericGraphNode, number>();
        const visited = new Set<GenericGraphNode>();
        const queue: { node: GenericGraphNode, distance: number }[] = [{ node: source, distance: 0 }];

        let maxDistance = 0;

        while (queue.length > 0) {
            const current = queue.shift();
            if(current){
                distances.set(current.node, current.distance);
                visited.add(current.node);

                maxDistance = Math.max(maxDistance, current.distance);


                for (const edge of current.node.outgoingEdges) {
                    const notCheck = edge.target instanceof GraphDataNode
                    if (!visited.has(edge.target) && !notCheck) {
                        queue.push({ node: edge.target, distance: current.distance + 1 });
                    }
                }
            }

        }

        return distances.get(target) === maxDistance;
    }

}
