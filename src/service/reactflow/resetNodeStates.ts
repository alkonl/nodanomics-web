import {EDiagramNode, IReactFlowNode} from "../../interface";

const resetNodeState = (node: IReactFlowNode): IReactFlowNode => {
    switch (node.data.type) {
        case EDiagramNode.Variable:
            return {
                ...node,
                data: {
                    ...node.data,
                    resources: [],
                    maxResources: undefined,
                    minResources: undefined,
                }
            }
        default:
            return node
    }
}

export const resetNodeStates = (nodes: IReactFlowNode[]) => {
    return nodes.map(node => {
        return resetNodeState(node)
    })
}
