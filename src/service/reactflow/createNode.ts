import {EDiagramNode, EFontAlign, INodeData} from "../../interface";
// eslint-disable-next-line import/named
import {Node, ReactFlowInstance} from "reactflow";
import {NodePreviewSVG} from "../../assets";
import {DragEvent} from "react";

let id = 0;
const getId = () => `dndnode_${id++}`;

export const createNode = ({type, reactFlowInstance, wrapperNode, event}: {
    type: EDiagramNode,
    reactFlowInstance: ReactFlowInstance<any, any>
    wrapperNode: HTMLDivElement
    event: DragEvent<HTMLDivElement>
}): Node<INodeData> | undefined => {
    const reactFlowBounds = wrapperNode?.getBoundingClientRect();
    const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
    });
    switch (type) {
        case EDiagramNode.Variable: {
            return {
                id: getId(),
                type,
                position,
                data: {
                    label: 'oooo',
                    value: 'my value',
                    id: getId(),
                    preview: {
                        type: 'Component',
                        Component: NodePreviewSVG.Pool,
                    },
                    name: 'name of node',
                    style: {
                        borderColor: '#000',
                        textStyles: {
                            fontAlign: EFontAlign.Center,
                            fontFamily: 'Roboto',
                            fontSize: 14,
                            fontColor: '#000',
                            fontStyles: [],
                        },
                        isFilled: false,
                        borderWidth: 1,
                    }
                }
            };
            break;
        }
        default :
            console.error(`wrong node type: ${type}`)
            break;
    }
}
