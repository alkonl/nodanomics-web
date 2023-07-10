import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import {IDiagramNodeStyle, INodeData} from "../interface";

export const useUpdateNode = ({nodeId}: {
    nodeId?: string
}) => {
    const dispatch = useAppDispatch()
    const {updateNode} = diagramEditorActions
    const {diagramNodes} = useDiagramEditorState()
    const selectedNode = diagramNodes.find(node => node.id === nodeId)
    const updateNodeData = (data: Partial<INodeData>) => {
        if (selectedNode) {
            dispatch(updateNode({
                ...selectedNode,
                data: {
                    ...selectedNode.data,
                    ...data
                }
            }))
        }
    }

    const updateNodeStyle = (label: Partial<IDiagramNodeStyle>) => {
        if (selectedNode) {
            dispatch(updateNode({
                ...selectedNode,
                data: {
                    ...selectedNode.data,
                    style: {
                        ...selectedNode.data.style,
                        ...label
                    }
                }
            }))
        }
    }
    return {
        updateNodeData,
        updateNodeStyle
    }
}
