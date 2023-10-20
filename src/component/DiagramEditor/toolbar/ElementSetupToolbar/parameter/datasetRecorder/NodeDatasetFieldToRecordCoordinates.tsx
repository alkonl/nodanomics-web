import React from 'react';
import {ElementParameter} from "../ElementParameter";
import {Parameter} from "../../../../../base";
import {Box} from "@mui/material";
import {IDatasetRecorder, IDiagramNodeBaseData} from "../../../../../../interface";
import {useUpdateNode} from "../../../../../../hooks";

export const NodeDatasetFieldToRecordCoordinates: React.FC<{
    nodeData: IDiagramNodeBaseData & IDatasetRecorder
}> = ({nodeData}) => {

    const {updateNodeData} = useUpdateNode<IDiagramNodeBaseData & IDatasetRecorder>({
        nodeId: nodeData.id,
    })

    const onDatasetXChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateNodeData({
            datasetX: event.target.value,
        })
    }

    const onDatasetYChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateNodeData({
            datasetY: event.target.value,
        })
    }


    const showDatasetX = nodeData.datasetX !== undefined
    ? nodeData.datasetX
    : '';

    const showDatasetY = nodeData.datasetY !== undefined
    ? nodeData.datasetY
    : '';

    return (
        <ElementParameter label="">
        <Box sx={{
            display: 'flex',
            gap: 1,
        }}>

                <Parameter.Text sx={{
                    fontWeight: 400,
                    marginRight: 0.25,
                }}>
                    X
                </Parameter.Text>
                <Parameter.Input
                    value={showDatasetX}
                    onChange={onDatasetXChange}
                />
            </Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center'

            }}>
                <Parameter.Text sx={{
                    fontWeight: 400,
                    marginRight: 0.25,
                }}>
                    Y
                </Parameter.Text>
                <Parameter.Input
                    value={showDatasetY}
                    onChange={onDatasetYChange}
                />
            </Box>
        </ElementParameter>
    );
};
