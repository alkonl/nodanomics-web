import React from 'react';
import {IDataNodeData} from "../../../../../../interface";
import {ElementParameter} from "../ElementParameter";
import {Parameter} from "../../../../../base";
import {Box} from "@mui/material";
import {useUpdateNode} from "../../../../../../hooks";

export const NodeDataCapacityParameters: React.FC<{
    nodeData: IDataNodeData
}> = ({nodeData}) => {

    const {updateNodeData} = useUpdateNode<IDataNodeData>({
        nodeId: nodeData.id,
    })

    const onMinCapacityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateNodeData({
            minCapacity: Number(event.target.value),
        })
    }

    const onMaxCapacityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateNodeData({
            maxCapacity: Number(event.target.value),
        })
    }

    return (
        <ElementParameter label="Capacity">
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
                        Min
                    </Parameter.Text>
                    <Parameter.Input
                        type="number"
                        value={nodeData.minCapacity || ''}
                        onChange={onMinCapacityChange}
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
                        Max
                    </Parameter.Text>
                    <Parameter.Input
                        type="number"
                        value={nodeData.maxCapacity || ''}
                        onChange={onMaxCapacityChange}
                    />
                </Box>
            </Box>

        </ElementParameter>
    )
}
