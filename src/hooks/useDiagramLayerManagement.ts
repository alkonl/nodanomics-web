import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";

export const useDiagramLayerManagement = () => {
    const dispatch = useAppDispatch()
    const {layers} = useDiagramEditorState().settings
    const selectLayer = (layerId: string) => {
        const changedLayers = layers.map(layer => {
            const isSelected = layer.id === layerId
            return {
                ...layer,
                isSelected,
            }
        })
        dispatch(diagramEditorActions.updateLayers(changedLayers))
    }

    const changeVisibility = (layerId: string) => {
        const changedLayers = layers.map(layer => {
            if (layer.id === layerId) {
                return {
                    ...layer,
                    visible: !layer.visible,
                }
            }
            return layer
        })
        dispatch(diagramEditorActions.updateLayers(changedLayers))
    }

    return {
        changeVisibility,
        selectLayer,
    }
}
