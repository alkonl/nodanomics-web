import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import {IReactFlowEdge, IReactFlowNode} from "../interface";

export const useDiagramLayerManagement = () => {
    const dispatch = useAppDispatch()
    const {settings, diagramNodes, diagramEdges} = useDiagramEditorState()
    const {layers} = settings
    const selectLayer = (layerId: string) => {
        if (layers) {
            const changedLayers = layers.map(layer => {
                const isSelected = layer.id === layerId
                return {
                    ...layer,
                    isSelected,
                }
            })
            dispatch(diagramEditorActions.updateLayers(changedLayers))
        }

    }

    const changeVisibility = (layerId: string) => {

        if (layers) {
            const changedLayers = layers.map(layer => {
                if (layer.id === layerId) {
                    return {
                        ...layer,
                        visible: !layer.visible,
                    }
                }
                return layer
            })
            const visibleLayerIds = new Set<string>
            changedLayers.forEach(layer => {
                if (layer.visible) {
                    visibleLayerIds.add(layer.id)
                }
            })
            console.log('visibleLayerIds', visibleLayerIds)
            const hiddenNodeIds = new Set<string>()
            const updatedNodes: IReactFlowNode[] = diagramNodes.map(node => {
                const isVisible = visibleLayerIds.has(node.data.layerId)
                console.log('isVisible', isVisible)
                if(!isVisible) {
                    hiddenNodeIds.add(node.id)
                }
                return {
                    ...node,
                    hidden: !isVisible,
                }
            })
            const updatedEdges: IReactFlowEdge[] = diagramEdges.map(edge => {
                const isHidden = hiddenNodeIds.has(edge.source) || hiddenNodeIds.has(edge.target)
                return {
                    ...edge,
                    hidden: isHidden,
                }
            })

            dispatch(diagramEditorActions.updateLayers(changedLayers))
            dispatch(diagramEditorActions.bulkUpdateNodes(updatedNodes))
            dispatch(diagramEditorActions.bulkUpdateEdges(updatedEdges))
        }
    }

    return {
        changeVisibility,
        selectLayer,
    }
}
