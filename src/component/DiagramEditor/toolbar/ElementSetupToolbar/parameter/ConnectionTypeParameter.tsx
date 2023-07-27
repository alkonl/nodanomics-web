import React from 'react';
import {EConnection, IDiagramConnectionData} from "../../../../../interface";
import {useUpdateEdgeData} from "../../../../../hooks";
// eslint-disable-next-line import/named
import {SelectChangeEvent} from "@mui/material/Select/SelectInput";
import {MSelect} from "../../../../base";
import {ElementParameter} from "./ElementParameter";

const nodeTriggerModes = Object.keys(EConnection)

export const ConnectionTypeParameter: React.FC<{
    selectedElementData: IDiagramConnectionData
}> = ({selectedElementData}) => {

    const {updateEdgeType} = useUpdateEdgeData({
        edgeId: selectedElementData.id,
    })
    const changeEdgeType = (event: SelectChangeEvent) => {
        updateEdgeType(event.target.value as EConnection)
    }

    return (
        <ElementParameter label="Conection Type">
            <MSelect.Parameters
                values={nodeTriggerModes}
                currentValue={selectedElementData.type}
                onChange={changeEdgeType}
            />
        </ElementParameter>
    );
};
