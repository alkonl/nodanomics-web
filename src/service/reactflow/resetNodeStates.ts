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
                    resourcesCountHistory: undefined,
                }
            }
        case EDiagramNode.EventListener:
            return {
                ...node,
                data: {
                    ...node.data,
                    isEventTriggered: undefined,
                }
            }
        case EDiagramNode.EventTrigger:
            return {
                ...node,
                data: {
                    ...node.data,
                    isEventConditionMet: undefined,
                }
            }
        case EDiagramNode.MicroLoop:{
            return {
                ...node,
                data: {
                    ...node.data,
                    currentLoopCount: 0,
                }
            }
        }
        case EDiagramNode.MicroLoopStartNode:{
            return {
                ...node,
                data: {
                    ...node.data,
                    isLoopActive: undefined,
                    loopCurrentCount: undefined,
                }
            }
        }
        case EDiagramNode.WhileLoop:{
            return {
                ...node,
                data: {
                    ...node.data,
                    isLoopWasActive: undefined,
                    isLoopActive: undefined,
                }
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
