import React from 'react';
// eslint-disable-next-line import/named
import {Handle, NodeProps, Position} from "reactflow";
import {Box} from "@mui/material";
import {IPoolNodeData} from "../../../../interface";

export const PoolNode: React.FC<NodeProps<IPoolNodeData>> = ({isConnectable}) => {
    return (
        <Box>
            <Handle type="target" position={Position.Top} isConnectable={isConnectable}/>
            PoolNode
        </Box>
    );
};
