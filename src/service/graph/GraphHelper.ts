import {GraphInvokableNode, GraphLoopNode} from "./GraphNodes";
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
        const theLongestBranchIsInner = false
        console.log(`node.outgoingEdges ${node.data.name}`, node.outgoingEdges.map(e => e.target.data.name))
        for (const edge of node.outgoingEdges) {
            let skipEdge = false
            if (edge.target instanceof GraphLoopNode) {
                if (edge.target instanceof GraphMicroLoopNode && edge.target.data.isAccumulative) {
                    skipEdge = false
                } else if(edge.sourceMode === EConnectionMode.LoopInnerToChildren) {
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
                }
                console.log(`depth ${edge.target.data.name}`, depth)
            }
        }

        const isNotAccumulativeMicroLoop = node instanceof GraphMicroLoopNode && !node.data.isAccumulative
        const multipleDepthByLoopCount = 0
        console.log(`total depth ${node.data.name}`, maxDepth)
        return maxDepth + 1; // +1 to count the current node
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


}
