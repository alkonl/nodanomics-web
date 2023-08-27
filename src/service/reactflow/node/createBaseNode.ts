import {nanoid} from "nanoid";
import {
    EDiagramNode,
    EElementType,
    ENodeAction,
    ENodeTrigger,
    IDiagramNodeBaseData,
    IReactFlowNode
} from "../../../interface";
import {initialNodeDiagramElement, loopSize} from "../../../constant";

const getId = () => `nodeId_${nanoid()}`;

export const createBaseNode = ({type, position}: {
    type: EDiagramNode,
    position: { x: number, y: number },
}): IReactFlowNode => {
    const nodeId = getId();
    const baseParams = {
        id: nodeId,
        type,
        position,
    }
    const baseData: IDiagramNodeBaseData = {
        elementType: EElementType.Node,
        type,
        label: '',
        id: nodeId,
        style: initialNodeDiagramElement,
        name: `node name ${nodeId}`,
        isCollapsed: true,
    }


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
                }
            }
        }
        case EDiagramNode.Data: {
            return {
                ...baseParams,
                data: {
                    ...baseData,
                    type,
                    resources: [],
                    resourcesToProvide: [],
                    actionMode: ENodeAction.pullAny,
                    trigger: {
                        mode: ENodeTrigger.passive,
                    },
                    history: [],
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
                    // isEventConditionMet: false,
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
                    }
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
                    }
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
                }
            }
        }
        default :
            throw new Error(`Unknown node type: ${type}`);
    }
}
