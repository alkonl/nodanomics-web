import {EDiagramNode, IReactFlowNode} from "../../interface";
import {generateResource} from "../diagram";

export const resetNodeState = (node: IReactFlowNode): IReactFlowNode => {
    const resource = generateResource(0)
    switch (node.data.type) {
        case EDiagramNode.Data:
            return {
                ...node,
                data: {
                    ...node.data,
                    resources: node.data.initialResources || resource,
                    resourcesToProvide: node.data.initialResources || resource,
                    history: [],
                    changeCount: undefined,
                }
            }
        case EDiagramNode.Formula:
            return {
                ...node,
                data: {
                    ...node.data,
                    result: undefined,
                    history: [],
                }
            }
        case EDiagramNode.EventListener:
            return {
                ...node,
                data: {
                    ...node.data,
                    isEventTriggered: false,
                }
            }
        case EDiagramNode.EventTrigger:
            return {
                ...node,
                data: {
                    ...node.data,
                    isEventTriggered: false,
                }
            }
        case EDiagramNode.MicroLoop:{
            return {
                ...node,
                data: {
                    ...node.data,
                    currentLoopCount: 0,
                    isLoopActive: undefined,
                    isLoopWasActive: undefined,
                    incomingVariables: [],
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
                    incomingVariables: [],
                }
            }
        }
        case EDiagramNode.Sink: {
            return {
                ...node,
                data: {
                    ...node.data,
                    history: [],
                }
            }
        }
        case EDiagramNode.Transfer: {
            return {
                ...node,
                data: {
                    ...node.data,
                    history: [],
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
