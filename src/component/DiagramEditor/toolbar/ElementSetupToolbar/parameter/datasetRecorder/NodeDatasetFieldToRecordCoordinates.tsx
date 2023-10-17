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
            datasetX: Number(event.target.value),
        })
    }

    const onDatasetYChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateNodeData({
            datasetY: Number(event.target.value),
        })
    }


    const showDatasetX = nodeData.datasetX !== undefined
    ? nodeData.datasetX
    : '';

    const showDatasetY = nodeData.datasetY !== undefined
    ? nodeData.datasetY
    : '';

    return (
        <ElementParameter label="Coordinates">
        <Box sx={{
            display: 'flex',
            gap: 1,
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center'
            }}>
                <Parameter.Text sx={{
                    fontWeight: 400,
                    marginRight: 0.25,
                }}>
                    X
                </Parameter.Text>
                <Parameter.Input
                    type="number"
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
                    type="number"
                    value={showDatasetY}
                    onChange={onDatasetYChange}
                />
            </Box>
        </Box>
        </ElementParameter>
    );
};
