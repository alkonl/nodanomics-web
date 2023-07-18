import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import {EElementType, ENodeTrigger, IDiagramConnectionData, IDiagramNodeStyle, INodeData} from "../interface";

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

    const updateNodeTrigger = ({trigger}: { trigger: ENodeTrigger }) => {
        if (selectedNode) {
            if (trigger === ENodeTrigger.interactive) {
                dispatch(updateNodeData({
                    ...selectedNode.data,
                    id: selectedNode.id,
                    type: selectedNode?.data.type,
                    trigger: {
                        mode: trigger,
                        isClicked: false
                    }
                }))
            } else {
                dispatch(updateNodeData({
                    ...selectedNode.data,
                    id: selectedNode.id,
                    type: selectedNode?.data.type,
                    trigger: {
                        mode: trigger
                    }
                }))
            }
        }
    }

    const unableInteractiveTrigger = () => {
        if (selectedNode) {
            dispatch(updateNodeData({
                ...selectedNode.data,
                id: selectedNode.id,
                type: selectedNode?.data.type,
                trigger: {
                    mode: ENodeTrigger.interactive,
                    isClicked: true
                }
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
        updateNodeStyle,
        updateNodeTrigger,
        unableInteractiveTrigger,
    }
}


export const useUpdateEdgeData = ({edgeId}: {
    edgeId?: string
}) => {
    const dispatch = useAppDispatch()
    const {updateEdgeData} = diagramEditorActions
    const {diagramEdges} = useDiagramEditorState()
    const selectedEdge = diagramEdges.find(edge => edge.id === edgeId)

    const updateEdgeDataWrapper = (data: Partial<IDiagramConnectionData>) => {
        if (selectedEdge && selectedEdge.data) {
            dispatch(updateEdgeData({
                type: selectedEdge?.data.type,
                id: selectedEdge.id,
                ...data,
            }))
        }
    }

    const updateEdgeStyle = (edgeStyle: Partial<IDiagramNodeStyle>) => {
        if (selectedEdge && selectedEdge.data) {
            updateEdgeDataWrapper({
                ...selectedEdge.data,
                style: {
                    ...selectedEdge?.data.style,
                    ...edgeStyle
                }
            })
        }
    }

    return {
        updateEdgeData: updateEdgeDataWrapper,
        updateEdgeStyle
    }
}


export const useUpdateElement = ({elementId, elementType}: {
    elementId?: string,
    elementType?: EElementType
}) => {
    const updateNode = useUpdateNode({nodeId: elementType === EElementType.Node ? elementId : undefined})
    const updateEdgeData = useUpdateEdgeData({edgeId: elementType === EElementType.Connection ? elementId : undefined})
    return {
        ...updateNode,
        ...updateEdgeData
    }
}
