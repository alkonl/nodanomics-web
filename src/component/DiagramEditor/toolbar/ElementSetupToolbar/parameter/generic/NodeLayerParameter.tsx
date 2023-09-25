import React from 'react';
import {IDiagramNodeBaseData, IEventListenerNodeData, IEventTriggerNodeData} from "../../../../../../interface";
import {ElementParameter} from "../ElementParameter";
import {Parameter} from "../../../../../base";
import {useDiagramEditorState} from "../../../../../../redux";

export const NodeLayerParameter: React.FC<{
    nodeData: IDiagramNodeBaseData
}> = ({nodeData}) => {
    const {layers} = useDiagramEditorState().settings

    const layerName = layers?.find(layer => layer.id === nodeData.layerId)?.name || ''


    return (
        <ElementParameter label="Layer">
            <Parameter.Label
                sx={{
                    textAlign: 'left',
                }}
            >
                {layerName}
            </Parameter.Label>
        </ElementParameter>
    )
}
