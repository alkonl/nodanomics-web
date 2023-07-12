import {EDiagramNode, EFontAlign, IDiagramNodeBaseData, IReactFlowNode} from "../../interface";
// eslint-disable-next-line import/named
import {ReactFlowInstance} from "reactflow";
import {DragEvent} from "react";
import {EFontColor} from "../../constant";

let id = 0;
const getId = () => `nodeId_${id++}`;


const initialNodeStyle = {
    borderColor: '#000',
    textStyles: {
        fontAlign: EFontAlign.Center,
        fontFamily: 'Roboto',
        fontSize: 14,
        fontColor: EFontColor.grey4,
        fontStyles: [],
    },
    borderWidth: 1,
}

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
        type,
        label: '',
        id: nodeId,
        style: initialNodeStyle,
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
        default :
            console.error(`wrong node type: ${type}`)
            break;
    }
}
