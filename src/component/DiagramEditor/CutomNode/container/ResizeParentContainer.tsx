import React from 'react';
import {Box} from "@mui/material";
import {INodeData} from "../../../../interface";
// eslint-disable-next-line import/named
import {NodeProps} from "reactflow";

export const ResizeParentContainer: React.FC<{
    children: React.ReactNode
    node: NodeProps<INodeData>
}> = ({node,children}) => {

    return (
        <Box>
            {children}
        </Box>
    );
};
