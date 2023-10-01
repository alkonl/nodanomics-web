import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import {EDiagramNode} from "../interface";

export const useDeleteNode = () => {
    const dispatch = useAppDispatch()
    const {diagramNodes} = useDiagramEditorState()
    const startNodeId = diagramNodes.find(node => node.data.type === EDiagramNode.Start)?.id
    const {deleteNode, renderState} = diagramEditorActions
    return (nodeIds: string[]) => {
        const filttredNodes = nodeIds.filter(nodeId => nodeId !== startNodeId)
        dispatch(deleteNode({
            nodeIds: filttredNodes
        }))
        dispatch(renderState())

    }
}
