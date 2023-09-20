import {EDiagramNode, IReactFlowNode} from "../../interface";

export const getNodeUsedTags = (node: IReactFlowNode): string[] | undefined => {
    if (node.data.type === EDiagramNode.Formula) {
        return node.data.formula?.split(/[^a-zA-Z0-9.]+/).filter(Boolean)
    }
}
