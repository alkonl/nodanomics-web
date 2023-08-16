import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import {
    EConnection,
    EElementType,
    ENodeTrigger, IDiagramConnectionBaseData,
    IDiagramConnectionData,
    IDiagramNodeBaseData,
    IDiagramNodeStyle,
    INodeData
} from "../interface";
import {connectionInitialProps, connectionStyle} from "../service";

export const useUpdateNode = <IGenericNode extends IDiagramNodeBaseData = INodeData>({nodeId}: {
    nodeId?: string
}) => {
    const dispatch = useAppDispatch()
    const {updateNodeData} = diagramEditorActions
    const {diagramNodes} = useDiagramEditorState()
    const selectedNode = diagramNodes.find(node => node.id === nodeId)
    const updateNodeDataWrapper = <R extends IGenericNode, P = R>(data: Partial<P>) => {
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
                updateNodeDataWrapper({
                    trigger: {
                        mode: trigger,
                        isClicked: false
                    }
                })
            } else {
                updateNodeDataWrapper({
                    trigger: {
                        mode: trigger,
                    }
                })
            }
        }
    }

    const unableInteractiveTrigger = () => {
        if (selectedNode) {
            updateNodeDataWrapper({
                trigger: {
                    mode: ENodeTrigger.interactive,
                    isClicked: true
                }
            })

        }
    }

    const updateNodeStyle = (nodeStyles: Partial<IGenericNode['style']>) => {
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


export const useUpdateEdgeData = <IGenericConnection extends IDiagramConnectionBaseData = IDiagramConnectionData>({edgeId}: {
    edgeId?: string
}) => {
    const dispatch = useAppDispatch()
    const {updateEdgeData, replaceEdge, renderState} = diagramEditorActions
    const {diagramEdges} = useDiagramEditorState()
    const selectedEdge = diagramEdges.find(edge => edge.id === edgeId)

    const updateEdgeDataWrapper = <R extends IGenericConnection, P = R>(data: Partial<P>) => {
        if (selectedEdge && selectedEdge.data) {
            dispatch(updateEdgeData({
                type: selectedEdge?.data.type,
                id: selectedEdge.id,
                ...data,
            }))
        }
    }

    const updateEdgeStyle = (edgeStyle: Partial<IGenericConnection['style']>) => {
        if (selectedEdge && selectedEdge.data) {
            updateEdgeDataWrapper({
                ...selectedEdge.data,
                type: selectedEdge.data.type,
                style: {
                    ...selectedEdge.data.style,
                    ...edgeStyle
                }
            })
        }
    }

    const updateEdgeType = (edgeType: EConnection) => {
        if (selectedEdge && selectedEdge.data) {
            dispatch(replaceEdge({
                ...selectedEdge,
                ...connectionStyle[edgeType],
                id: selectedEdge.id,
                source: selectedEdge.source,
                target: selectedEdge.target,
                type: edgeType,
                data: {
                    ...connectionInitialProps[edgeType],
                    sourceId: selectedEdge.source,
                    targetId: selectedEdge.target,
                    id: selectedEdge.id,
                }
            }))
        }
    }

    const updateVariableName = (props: { variableName: string }) => {
        updateEdgeDataWrapper({
            variableName: props.variableName
        })

    }

    const renderStateWrapper = () => {
        dispatch(renderState())
    }

    return {
        updateEdgeData: updateEdgeDataWrapper,
        updateEdgeStyle,
        updateEdgeType,
        updateVariableName,
        renderState: renderStateWrapper,
    }
}


export const useUpdateElement = ({elementId, elementType}: {
    elementId?: string,
    elementType: EElementType
}) => {
    const updateNode = useUpdateNode({nodeId: elementType === EElementType.Node ? elementId : undefined})
    const updateEdgeData = useUpdateEdgeData({edgeId: elementType === EElementType.Connection ? elementId : undefined})

    const updateElement = () => {
        if (elementType === EElementType.Node) {
            return updateNode.updateNodeData
        }
        return updateEdgeData.updateEdgeData
    }

    return {
        ...updateNode,
        ...updateEdgeData,
        updateElement: updateElement(),
    }
}
