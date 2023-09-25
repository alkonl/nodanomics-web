import {useDiagramEditorState} from "../redux";
import {IDiagramNodeBaseData} from "../interface";
import {IParametersSelectValue} from "../component";
import {useUpdateNode} from "./useUpdateNode";
import type {SelectChangeEvent} from "@mui/material/Select/SelectInput";
import {useOffHistoryExecuted} from "./useOffHistoryExecuted";

export const useChangeLayer = ({id, layerId}: IDiagramNodeBaseData) => {

    const {layers} = useDiagramEditorState().settings

    const currentLayer = layers?.find(layer => layer.id === layerId)
    const layersValues: IParametersSelectValue[] | undefined = layers?.map(layer => ({
        label: layer.name,
        value: layer.id
    }))

    const {updateNodeData} = useUpdateNode<IDiagramNodeBaseData>({nodeId: id})
    const offHistoryExecuted = useOffHistoryExecuted()

    const updateLayer = (event: SelectChangeEvent) =>{
        updateNodeData({
            layerId: event.target.value,
        })
        offHistoryExecuted('changeLayer')
    }

    return {
        currentLayer,
        layers: layersValues,
        updateLayer,
    }
}
