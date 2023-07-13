import React from 'react';
// eslint-disable-next-line import/named
import {Handle, NodeProps, Position} from "reactflow";
import {Box, Typography} from "@mui/material";
import {IPoolNodeData} from "../../../../interface";

export const PoolNode: React.FC<NodeProps<IPoolNodeData>> = ({isConnectable, data}) => {
    return (
        <Box>
            <Handle type="target" position={Position.Left} isConnectable={isConnectable}/>
            <Handle type="source" position={Position.Right} isConnectable={isConnectable}/>
            <Box sx={{
                border: '1px solid #777',
                width: 40,
                height: 40,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Box>
                    <Typography sx={{
                        fontSize: 10,
                    }}>
                        Pool
                    </Typography>
                </Box>
                <Typography>
                    {data.resources.length}
                </Typography>
            </Box>

        </Box>
    );
};
