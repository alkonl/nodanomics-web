import React from 'react';
import {ElementParameter} from "../ElementParameter";
import {MSelect} from "../../../../../base";
import type {SelectChangeEvent} from "@mui/material/Select/SelectInput";
import {useUpdateNode} from "../../../../../../hooks";
import {IDatasetRecorder, IDiagramNodeBaseData} from "../../../../../../interface";
import {useDiagramEditorState} from "../../../../../../redux";

export const NodeDatasetFieldToRecordSelectDataset: React.FC<{
    nodeData: IDiagramNodeBaseData & IDatasetRecorder
}> = ({nodeData}) => {
    const {spreadsheets} = useDiagramEditorState()

    const {updateNodeData} = useUpdateNode<IDiagramNodeBaseData & IDatasetRecorder>({
        nodeId: nodeData.id,
    })

    const mappedProjectDatasets = spreadsheets ? Object.entries(spreadsheets).map(([key, value]) => ({
        value: key,
        label: value.name,
    })) : []


    const changeDataset = (event: SelectChangeEvent) => {
        updateNodeData({
            datasetReceiverId: event.target.value,
        })
    }

    return (
        <ElementParameter label="Dataset">
            <MSelect.Parameters
                currentValue={nodeData.datasetReceiverId || ''}
                onChange={changeDataset}
                values={mappedProjectDatasets}
            />
        </ElementParameter>
    );
};

