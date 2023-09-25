import {useAddDiagramLayerMutation} from "../api";
import {useDiagramEditorState} from "../redux";
import React from "react";

export const useAddDiagramLayers = () => {
    const [newLayerName, setNewLayerName] = React.useState<string>();

    const {currentDiagramId} = useDiagramEditorState()

    const [addDiagramLayersReq, createdLayer] = useAddDiagramLayerMutation();

    const addDiagramLayer = ({layerName, diagramId}: {
        layerName: string
        diagramId: string,
    }) => {
            addDiagramLayersReq({layerName, diagramId, isSelected: false, visible: true})
    }

    const setNewLayerNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewLayerName(event.target.value);
    }

    const createNewLayer = (params?: {
        layerName: string
        diagramId: string
    }) => {
        if (params) {
            addDiagramLayer({layerName: params.layerName, diagramId: params.diagramId});
        }
    }

    const submitCreateNewLayer = () => {
        if(newLayerName && currentDiagramId) {
            addDiagramLayer({layerName: newLayerName, diagramId: currentDiagramId});
        }
    }

    return {
        createNewLayer,
        submitCreateNewLayer,
        newLayerName,
        setNewLayerNameHandler,
        createdLayer,
    }
}
