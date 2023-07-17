import React from 'react';
import {Box, Typography} from "@mui/material";
// eslint-disable-next-line import/named
import {Handle, NodeProps, Position} from "reactflow";
import {ISourceNodeData} from "../../../../interface";

export const SourceNode: React.FC<NodeProps<ISourceNodeData>> = ({isConnectable}) => {
    return (
        <Box>
            <Box sx={{
                border: '1px solid #777',
                padding: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Typography
                    sx={{
                        fontSize: 10,
                    }}
                >
                    Source
                </Typography>
            </Box>
            <Handle type="source" position={Position.Right} id="b" isConnectable={isConnectable}/>
        </Box>
    );
};
