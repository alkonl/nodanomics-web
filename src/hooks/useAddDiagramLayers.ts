import {useAddDiagramLayerMutation} from "../api";
import {useDiagramEditorState} from "../redux";
import React from "react";

export const useAddDiagramLayers = () => {
    const [newLayerName, setNewLayerName] = React.useState<string>('');

    const {currentDiagramId} = useDiagramEditorState()

    const [addDiagramLayersReq] = useAddDiagramLayerMutation();

    const addDiagramLayer = ({layerName}: {
        layerName: string
    }) => {
        if (currentDiagramId) {
            addDiagramLayersReq({layerName, diagramId: currentDiagramId, isSelected: false, visible: true})
        }
    }

    const setNewLayerNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewLayerName(event.target.value);
    }

    const createNewLayer = () => {
        addDiagramLayer({layerName: newLayerName});
    }

    return {
        createNewLayer,
        newLayerName,
        setNewLayerNameHandler,
    }
}
