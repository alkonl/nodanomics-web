import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import {IDiagramNodeStyle, INodeData} from "../interface";

export const useUpdateNode = ({nodeId}: {
    nodeId?: string
}) => {
    const dispatch = useAppDispatch()
    const {updateNodeData} = diagramEditorActions
    const {diagramNodes} = useDiagramEditorState()
    const selectedNode = diagramNodes.find(node => node.id === nodeId)
    const updateNodeDataWrapper = (data: Partial<INodeData>) => {
        if (selectedNode) {
            dispatch(updateNodeData({
                id: selectedNode.id,
                type: selectedNode?.data.type,
                ...data,
            }))
        }
    }

    const updateNodeStyle = (nodeStyles: Partial<IDiagramNodeStyle>) => {
        if (selectedNode) {
            updateNodeDataWrapper({
                id: selectedNode.id,
                type: selectedNode?.data.type,
                style: {
                    ...selectedNode.data.style,
                    ...nodeStyles
                }
            })
        }
    }
    return {
        updateNodeData: updateNodeDataWrapper,
        updateNodeStyle
    }
}
