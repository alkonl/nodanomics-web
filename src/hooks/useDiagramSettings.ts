import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import {useGetDiagramSettingsQuery} from "../api";
import {useEffect} from "react";
import {IDiagramLayer} from "../interface";

export const useDiagramSettings = () => {
    const {currentDiagramId} = useDiagramEditorState()
    const dispatch = useAppDispatch()
    const {data: diagramSettings} = useGetDiagramSettingsQuery({diagramId: currentDiagramId}, {
        skip: !currentDiagramId
    })

    useEffect(() => {
        if (diagramSettings?.DiagramLayers) {
            const isLayerSelected = diagramSettings.DiagramLayers.some(layer => layer.isSelected)
            let preparedLayers: IDiagramLayer[] = diagramSettings.DiagramLayers
            if(!isLayerSelected && diagramSettings.DiagramLayers[0]){
                const selectedLayer: IDiagramLayer = {
                    ...diagramSettings.DiagramLayers[0],
                    isSelected: true,
                }
                preparedLayers = [selectedLayer, ...diagramSettings.DiagramLayers.slice(1)]
            }

            dispatch(diagramEditorActions.setDiagramLayers(preparedLayers))

        }
    }, [diagramSettings,dispatch, diagramSettings]);
}
