import {EDiagramNode, IReactFlowNode} from "../../interface";

export const getNodeValue = (node: IReactFlowNode) => {
    if (node.data.type === EDiagramNode.Data) {
        return node.data.resources.value
    } else if (node.data.type === EDiagramNode.Formula) {
        return node.data.result?.value
    }
}
