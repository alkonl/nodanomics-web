import {GraphBaseNode, GraphInvokableNode} from "./GraphNodes";
import {GraphChainEdge} from "./GraphEdge";
import {EConnectionMode} from "../../interface";
import {GenericGraphNode} from "./GenericGraphNode";


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
        for (const edge of node.outgoingEdges) {
            if (!visited.has(edge.target) && edge instanceof GraphChainEdge && edge.sourceMode !== EConnectionMode.LoopInnerToChildren) {
                maxDepth = Math.max(maxDepth, this.longestBranchFromNode(edge.target, visited));
            }
        }


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
