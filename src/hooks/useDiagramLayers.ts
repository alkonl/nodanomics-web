import {useAddDiagramLayerMutation} from "../api";
import {useDiagramEditorState} from "../redux";

export const useDiagramLayers = () => {
    const {currentDiagramId} = useDiagramEditorState()
    const [addDiagramLayersReq] = useAddDiagramLayerMutation();

    const addDiagramLayer = ({layerName}: {
        layerName: string
    }) => {
        if (currentDiagramId) {
            addDiagramLayersReq({layerName, diagramId: currentDiagramId})
        }
    }

    return {
        addDiagramLayer
    }
}
