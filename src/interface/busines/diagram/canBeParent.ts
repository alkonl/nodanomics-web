import {EDiagramNode} from "./node";

export const NODE_CAN_BE_PARENT = [EDiagramNode.MicroLoop, EDiagramNode.WhileLoop];

export const isNodeCanBeParent = (nodeType: EDiagramNode) => {
    return NODE_CAN_BE_PARENT.includes(nodeType);
}
