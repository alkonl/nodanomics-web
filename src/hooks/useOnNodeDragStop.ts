// eslint-disable-next-line import/named
import {EDiagramNode, IReactFlowNode, isINodeSize} from "../interface";
import {MouseEvent as ReactMouseEvent} from "react";
import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";

export const findParent = (node: IReactFlowNode, nodes: IReactFlowNode[]) => {
    if (node.type === EDiagramNode.MicroLoop) {
        return undefined
    }
    return nodes.find((nds: IReactFlowNode) => {

        if (nds.type === EDiagramNode.MicroLoop && isINodeSize(nds.data.style)) {
            const ndsSize = {
                width: nds.data.style.width,
                height: nds.data.style.height
            }
            if (
                nds.position.x <= node.position.x &&
                nds.position.x + parseInt(ndsSize.width?.toString() || "0") >=
                node.position.x &&
                nds.position.y <= node.position.y &&
                nds.position.y + parseInt(ndsSize.height?.toString() || "0") >=
                node.position.y
            ) {
                return nds
            }
        }
    });
}

export const useOnNodeDragStop = () => {
    const {diagramNodes} = useDiagramEditorState()
    const dispatch = useAppDispatch()
    const {updateNodeParent} = diagramEditorActions
    return (event: ReactMouseEvent, node: IReactFlowNode) => {
        const parentNode = findParent(node, diagramNodes)
        if (parentNode) {
            dispatch(updateNodeParent({
                node,
                parentNode
            }))
        }
    }
}


