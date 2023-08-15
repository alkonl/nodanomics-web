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
        isCollapsed: false,
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
                    actionMode: ENodeAction.pullAny,
                    trigger: {
                        mode: ENodeTrigger.passive,
                    },
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
                }
            }
        }
        case EDiagramNode.EventListener: {
            return {
                ...baseParams,
                data: {
                    ...baseData,
                    type,
                }
            }
        }
        case EDiagramNode.MicroLoop: {
            return {
                ...baseParams,
                zIndex: 0,
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
        default :
            throw new Error(`Unknown node type: ${type}`);
    }
}
