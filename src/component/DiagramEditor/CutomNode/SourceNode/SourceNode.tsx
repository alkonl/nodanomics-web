import React from 'react';
import {Box} from "@mui/material";
// eslint-disable-next-line import/named
import {Handle, NodeProps, Position} from "reactflow";
import {ISourceNodeData} from "../../../../interface";

export const SourceNode: React.FC<NodeProps<ISourceNodeData>> = ({isConnectable}) => {
    return (
        <Box>
            SourceNode
            <Handle type="source" position={Position.Right} id="b" isConnectable={isConnectable}/>
        </Box>
    );
};
