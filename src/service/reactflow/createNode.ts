// eslint-disable-next-line import/named
import {ReactFlowInstance} from "reactflow";
import {DragEvent} from "react";
import {initialNodeDiagramElement} from "../../constant";
import {EDiagramNode, EElementType, ENodeAction, IDiagramNodeBaseData, IReactFlowNode, ENodeTrigger} from "../../interface";

let id = 0;
const getId = () => `nodeId_${id++}`;




export const createNode = ({type, flowInstance, wrapperNode, event}: {
    type: EDiagramNode,
    flowInstance: ReactFlowInstance
    wrapperNode: HTMLDivElement
    event: DragEvent<HTMLDivElement>
}): IReactFlowNode | undefined => {
    const reactFlowBounds = wrapperNode?.getBoundingClientRect();
    const position = flowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
    });
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
    }
    switch (type) {
        case EDiagramNode.Variable: {
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
        case EDiagramNode.Source: {
            return {
                ...baseParams,
                data: {
                    ...baseData,
                    type,
                    triggerMode: ENodeTrigger.automatic,
                    actionMode: ENodeAction.pushAny,
                }
            }
        }
        case EDiagramNode.Pool: {
            return {
                ...baseParams,
                data: {
                    ...baseData,
                    type,
                    resources: [],
                    actionMode: ENodeAction.pullAny,
                    triggerMode: ENodeTrigger.passive,
                }
            }
        }
        default :
            console.error(`wrong node type: ${type}`)
            break;
    }
}
