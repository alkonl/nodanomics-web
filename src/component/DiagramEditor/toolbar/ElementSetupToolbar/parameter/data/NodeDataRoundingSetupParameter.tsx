import React from "react";
import {ENodeTrigger, IDataNodeData} from "../../../../../../interface";
import {useUpdateNode} from "../../../../../../hooks";
import {ElementParameter} from "../ElementParameter";
// eslint-disable-next-line import/named
import {SelectChangeEvent} from "@mui/material/Select/SelectInput";
import {MSelect} from "../../../../../base";

const nodeTriggerModes = ['No Rounding', 'Rounding']

export const NodeDataRoundingSetupParameter: React.FC<{
    nodeData: IDataNodeData
}> = ({nodeData}) => {

    const {updateNodeData} = useUpdateNode<IDataNodeData>({
        nodeId: nodeData.id,
    })
    const changeNodeTriggerMode = (event: SelectChangeEvent) => {
        updateNodeData({
            roundingType: event.target.value as ENodeTrigger,
        })
    }

    return (
        <ElementParameter label="Rounding">
            <MSelect.Parameters
                currentValue={nodeData.roundingType}
                onChange={changeNodeTriggerMode}
                values={nodeTriggerModes}
            />
        </ElementParameter>
    );
};

