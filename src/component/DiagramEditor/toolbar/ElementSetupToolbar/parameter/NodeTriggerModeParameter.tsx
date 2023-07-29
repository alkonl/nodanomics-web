import React from 'react';
// eslint-disable-next-line import/named
import {SelectChangeEvent} from "@mui/material/Select/SelectInput";
import {ENodeTrigger, INodeData} from "../../../../../interface";
import {useUpdateElement} from "../../../../../hooks";
import {ElementParameter} from "./ElementParameter";
import {MSelect} from "../../../../base";

const nodeTriggerModes = Object.keys(ENodeTrigger)

export const NodeTriggerModeParameter: React.FC<{
    nodeData: INodeData
}> = ({nodeData}) => {

    const selectedElementData = nodeData

    if (selectedElementData && !('trigger' in selectedElementData)) {
        throw new Error(`no triggerMode in selectedElementData ${JSON.stringify(selectedElementData)}`)
    }
    const {updateNodeTrigger} = useUpdateElement({
        elementType: selectedElementData.elementType,
        elementId: selectedElementData?.id,
    })
    const changeNodeTriggerMode = (event: SelectChangeEvent) => {
        updateNodeTrigger({
            trigger: event.target.value as ENodeTrigger,
        })
    }

    return (
        <ElementParameter label="Trigger">
            <MSelect.Parameters
                currentValue={selectedElementData.trigger.mode}
                onChange={changeNodeTriggerMode}
                values={nodeTriggerModes}
            />
        </ElementParameter>
    );
};
