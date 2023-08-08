import {EDiagramNode} from "../../../interface";

const nodesWithChildren = [
    EDiagramNode.MicroLoop,
    EDiagramNode.WhileLoop,
    ]

export const canNodeHasChildren = (nodeType: EDiagramNode ) => {
    return nodesWithChildren.includes(nodeType)
}
