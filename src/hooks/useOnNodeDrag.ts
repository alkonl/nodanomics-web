import {MouseEvent as ReactMouseEvent} from "react";
import {IReactFlowNode, isINodeSize} from "../interface";
import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";


export const useOnNodeDrag = () => {
    const dispatch = useAppDispatch()
    const {diagramNodes} = useDiagramEditorState()

    return (event: ReactMouseEvent, node: IReactFlowNode, nodes: IReactFlowNode[]) => {
        const parentNode = diagramNodes.find((diagramNode) => diagramNode.id === node.parentNode)
        if(parentNode && isINodeSize(parentNode.data.style)){
            const parentHeight = parseInt(parentNode.data.style.height?.toString() || "0")
            const updatedHeight = parentHeight + event.movementY
            console.log('event.movement', parentHeight, event.movementY,updatedHeight)
            const size = {
                width: parentNode.data.style.width + event.movementX,
                height: updatedHeight,
            }
            dispatch(diagramEditorActions.updateNodeSize({nodeId: parentNode.id, size: size}))
            console.log('useOnNodeDrag: ', parentNode)
        }
    }
}
