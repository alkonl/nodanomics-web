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
            const hiddenLayerIds = new Set<string>
            changedLayers.forEach(layer => {
                if (!layer.visible) {
                    hiddenLayerIds.add(layer.id)
                }
            })

            const hiddenNodeIds = new Set<string>()
            const updatedNodes: IReactFlowNode[] = diagramNodes.map(node => {
                const isHidden = hiddenLayerIds.has(node.data.layerId)
                if(isHidden) {
                    hiddenNodeIds.add(node.id)
                }
                return {
                    ...node,
                    hidden: isHidden,
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

    const deleteLayer = (layerId: string) => {

    }

    return {
        changeVisibility,
        selectLayer,
        deleteLayer,
    }
}
