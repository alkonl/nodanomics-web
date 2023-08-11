import React from 'react';
import {MSelect} from "../../../../base";
import {ElementParameter} from "./ElementParameter";
// eslint-disable-next-line import/named
import {SelectChangeEvent} from "@mui/material/Select/SelectInput";
import {IDatasetDatafield} from "../../../../../interface";
import {useProjectDatasets, useUpdateNode} from "../../../../../hooks";
import {useDiagramEditorState} from "../../../../../redux";

export const DatasetParameter: React.FC<{
    nodeData: IDatasetDatafield
}> = ({nodeData}) => {
    const {currentDiagramId} = useDiagramEditorState()
    const projectDatasets = useProjectDatasets({
        diagramId: currentDiagramId,
    })
    const {updateNodeData} = useUpdateNode<IDatasetDatafield>({
        nodeId: nodeData.id,
    })

    const mappedProjectDatasets = projectDatasets?.data.map((projectDataset) => ({
        value: projectDataset.id,
        label: projectDataset.name,
    })) || []


    const changeNodeTriggerMode = (event: SelectChangeEvent) => {
        updateNodeData({
            datasetId: event.target.value,
        })
    }

    return (
        <ElementParameter label="Dataset">
            <MSelect.Parameters
                currentValue={nodeData.datasetId}
                onChange={changeNodeTriggerMode}
                values={mappedProjectDatasets}
            />
        </ElementParameter>
    );
};
