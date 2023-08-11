import React from 'react';
import {MSelect} from "../../../../../base";
import {ElementParameter} from "../ElementParameter";
// eslint-disable-next-line import/named
import {SelectChangeEvent} from "@mui/material/Select/SelectInput";
import {IDatasetDatafield} from "../../../../../../interface";
import {useUpdateNode} from "../../../../../../hooks";

export const DataFieldParameter: React.FC<{
    nodeData: IDatasetDatafield
}> = ({nodeData}) => {

    const {updateNodeData} = useUpdateNode<IDatasetDatafield>({
        nodeId: nodeData.id,
    })

    const changeNodeTriggerMode = (event: SelectChangeEvent) => {
        updateNodeData({
            datasetId: event.target.value,
        })
    }

    return (
        <ElementParameter label="Data Field">
            <MSelect.Parameters
                onChange={changeNodeTriggerMode}
                values={[]}
            />
        </ElementParameter>
    );
};
