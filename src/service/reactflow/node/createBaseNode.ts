import {
    EDiagramNode,
    EElementType,
    ENodeAction,
    ENodeTrigger,
    IDiagramNodeBaseData,
    IReactFlowNode
} from "../../../interface";
import {initialNodeDiagramElement, loopSize} from "../../../constant";
import {generateNodeId} from "./generateNodeId";
import {generateResource} from "../../diagram";



export const createBaseNode = ({type, position, layerId}: {
    type: EDiagramNode,
    layerId: string,
    position: { x: number, y: number },
}): IReactFlowNode => {
    const nodeId = generateNodeId();
    const baseParams = {
        id: nodeId,
        type,
        position,
    }

    const baseData: IDiagramNodeBaseData = {
        layerId,
        elementType: EElementType.Node,
        type,
        label: '',
        id: nodeId,
        style: initialNodeDiagramElement,
        name: `node name ${nodeId}`,
        isCollapsed: true,
        connectedNodes: [],
    }

    const resource = generateResource(0)


    switch (type) {
        case EDiagramNode.StaticVariable: {
            return {
                ...baseParams,
                data: {
                    ...baseData,
                    type,
                },
            };
        }
        case EDiagramNode.Formula: {
            return {
                ...baseParams,
                data: {
                    ...baseData,
                    type,
                    isShowInExecutionGraphNode: false,
                    isAutomatic: false,
                    history: [],
                    isExecuted: false,
                },
            }
        }
        case EDiagramNode.Origin: {
            return {
                ...baseParams,
                data: {
                    ...baseData,
                    type,
                    trigger: {
                        mode: ENodeTrigger.automatic,
                    },
                    actionMode: ENodeAction.pushAny,
                    isExecuted: false,
                }
            }
        }
        case EDiagramNode.Data: {
            return {
                ...baseParams,
                data: {
                    ...baseData,
                    type,
                    resources: resource,
                    isShowInExecutionGraphNode: false,
                    resourcesToProvide: resource,
                    actionMode: ENodeAction.pullAny,
                    trigger: {
                        mode: ENodeTrigger.passive,
                    },
                    history: [],
                    isExecuted: false,
                    isAssigned: false,
                }
            }
        }
        case EDiagramNode.EventTrigger: {
            return {
                ...baseParams,
                data: {
                    ...baseData,
                    type,
                    eventName: '',
                    isExecuted: false,
                }
            }
        }
        case EDiagramNode.EventListener: {
            return {
                ...baseParams,
                data: {
                    ...baseData,
                    type,
                    isEventTriggered: false,
                    isExecuted: false,
                }
            }
        }
        case EDiagramNode.MicroLoop: {
            return {
                ...baseParams,
                data: {
                    ...baseData,
                    type,
                    currentLoopCount: 0,
                    name: 'MicroLoop',
                    incomingVariables: [],
                    outgoingVariables: [],
                    style: {
                        ...baseData.style,
                        width: loopSize.minWidth,
                        height: loopSize.minHeight,
                    },
                    isExecuted: false,
                },

            }
        }
        case EDiagramNode.WhileLoop: {
            return {
                ...baseParams,
                data: {
                    ...baseData,
                    type,
                    name: 'WhileLoop',
                    incomingVariables: [],
                    outgoingVariables: [],
                    style: {
                        ...baseData.style,
                        width: loopSize.minWidth,
                        height: loopSize.minHeight,
                    },
                    isExecuted: false,
                }
            }
        }
        case EDiagramNode.DatasetDatafield: {
            return {
                ...baseParams,
                data: {
                    ...baseData,
                    type,
                }
            }
        }
        case EDiagramNode.Start: {
            return {
                ...baseParams,
                data: {
                    ...baseData,
                    name: 'Start node',
                    type,
                    isExecuted: false,
                }
            }
        }
        case EDiagramNode.Sink: {
            return {
                ...baseParams,
                data: {
                    ...baseData,
                    type,
                    trigger: {
                        mode: ENodeTrigger.automatic,
                    },
                    actionMode: ENodeAction.pullAny,
                    history: [],
                    isExecuted: false,
                }
            }
        }
        case EDiagramNode.Transfer: {
            return {
                ...baseParams,
                data: {
                    ...baseData,
                    type,
                    isExecuted: false,
                    history: [],
                }
            }
        }
        case EDiagramNode.Label: {
            return {
                ...baseParams,
                data: {
                    ...baseData,
                    type,
                }
            }
        }
        default :
            throw new Error(`Unknown node type: ${type}`);
    }
}
