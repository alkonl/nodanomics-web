import React from 'react';
// eslint-disable-next-line import/named
import {Handle, NodeProps, Position} from "reactflow";
import {Box, Typography} from "@mui/material";
import {IPoolNodeData} from "../../../../interface";

export const PoolNode: React.FC<NodeProps<IPoolNodeData>> = ({isConnectable, data}) => {
    return (
        <Box>
            <Handle type="target" position={Position.Top} isConnectable={isConnectable}/>
            <Typography sx={{
                border: '1px solid #777',
                borderRadius: '100%',
                width: 40,
                height: 40,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {data.resources.length}
            </Typography>
            PoolNode
        </Box>
    );
};
