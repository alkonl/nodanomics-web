import {IReactFlowNode} from "../../interface";

// get all parents of a node. from deepest to shallowest
export const findAllParents = (node: IReactFlowNode, nodes: IReactFlowNode[]) => {
    const parents: IReactFlowNode[] = [];
    const findParent = (node: IReactFlowNode, nodes: IReactFlowNode[]) => {
        const parent = nodes.find((n) => n.id === node.parentNode);
        if (parent) {
            parents.push(parent);
            findParent(parent, nodes);
        }
    };
    findParent(node, nodes);
    return parents;
}
