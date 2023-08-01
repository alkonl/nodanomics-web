// eslint-disable-next-line import/named
import {ReactFlowInstance} from "reactflow";
import {DragEvent} from "react";
import {EDiagramNode, ICreatedNode,} from "../../../interface";
import {createNode} from "./createNode";


export const createNodeOnDrag = ({type, flowInstance, wrapperNode, event}: {
    type: EDiagramNode,
    flowInstance: ReactFlowInstance
    wrapperNode: HTMLDivElement
    event: DragEvent<HTMLDivElement>
}): ICreatedNode => {

    const reactFlowBounds = wrapperNode?.getBoundingClientRect();
    const position = flowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
    });
    return createNode({type, position})
}
