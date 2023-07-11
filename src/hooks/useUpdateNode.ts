import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import {IDiagramNodeStyle, INodeData} from "../interface";
import {Optionalize} from "../utils";

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

    const updateNodeStyle = (label: Partial<IDiagramNodeStyle>) => {
        if (selectedNode) {
            // dispatch(updateNode({
            //     ...selectedNode,
            //     data: {
            //         ...selectedNode.data,
            //         style: {
            //             ...selectedNode.data.style,
            //             ...label
            //         }
            //     }
            // }))
        }
    }
    return {
        updateNodeData: updateNodeDataWrapper,
        updateNodeStyle
    }
}
