import {EDiagramNode, EFontAlign, IDiagramNodeBaseData, INodeData} from "../../interface";
// eslint-disable-next-line import/named
import {Node, ReactFlowInstance} from "reactflow";
import {DragEvent} from "react";
import {EFontColor} from "../../constant";

let id = 0;
const getId = () => `${id++}`;


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
    flowInstance: ReactFlowInstance<any, any>
    wrapperNode: HTMLDivElement
    event: DragEvent<HTMLDivElement>
}): Node<INodeData> | undefined => {
    const reactFlowBounds = wrapperNode?.getBoundingClientRect();
    const position = flowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
    });
    const baseParams = {
        id: getId(),
        type,
        position,
    }
    const baseData: IDiagramNodeBaseData = {
        type,
        label: '',
        id: getId(),
        style: initialNodeStyle,
        name: `node name ${getId()}`,
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
            break;
        }
        case EDiagramNode.Formula: {
            // return {
            //     ...baseParams,
            // }
            break;
        }
        default :
            console.error(`wrong node type: ${type}`)
            break;
    }
}
