import {diagramEditorActions, useAppDispatch} from "../redux";
import {useGetDiagramSettingsQuery} from "../api";
import {useEffect} from "react";
import {IDiagramLayer} from "../interface";

export const useDiagramSettings = ({diagramId}: {
    diagramId: string
}) => {
    const dispatch = useAppDispatch()
    const {data: diagramSettings, isSuccess} = useGetDiagramSettingsQuery({diagramId}, {
        skip: !diagramId
    })

    useEffect(() => {
        if (diagramSettings?.DiagramLayers) {
            const isLayerSelected = diagramSettings.DiagramLayers.some(layer => layer.isSelected)
            let preparedLayers: IDiagramLayer[] = diagramSettings.DiagramLayers
            if (!isLayerSelected && diagramSettings.DiagramLayers[0]) {
                const selectedLayer: IDiagramLayer = {
                    ...diagramSettings.DiagramLayers[0],
                    isSelected: true,
                }
                preparedLayers = [selectedLayer, ...diagramSettings.DiagramLayers.slice(1)]
            }

            dispatch(diagramEditorActions.setDiagramSetting({
                layers: preparedLayers,
            }))

        }
    }, [diagramSettings, diagramSettings]);

    return {
        requestedDiagramId: diagramId,
        isUploaded: isSuccess,
    }
}
