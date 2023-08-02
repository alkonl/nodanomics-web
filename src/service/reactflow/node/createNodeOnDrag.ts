// eslint-disable-next-line import/named
import {ReactFlowInstance} from "reactflow";
import {DragEvent} from "react";
import {EDiagramNode, IReactFlowNode,} from "../../../interface";
import {createBaseNode} from "./createBaseNode";


export const createNodeOnDrag = ({type, flowInstance, wrapperNode, event}: {
    type: EDiagramNode,
    flowInstance: ReactFlowInstance
    wrapperNode: HTMLDivElement
    event: DragEvent<HTMLDivElement>
}): IReactFlowNode => {

    const reactFlowBounds = wrapperNode?.getBoundingClientRect();
    const position = flowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
    });
    return createBaseNode({type, position})
}
