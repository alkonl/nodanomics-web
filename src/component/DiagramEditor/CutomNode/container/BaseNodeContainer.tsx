import React from 'react';
import {Box} from "@mui/material";
import {INodeData} from "../../../../interface";
// eslint-disable-next-line import/named
import {NodeProps} from "reactflow";
import {EColor} from "../../../../constant";

export const BaseNodeContainer: React.FC<{
    children: React.ReactNode
    node: NodeProps<INodeData>
}> = ({
          children,
          node
      }) => {
    const {data} = node;
    return (
        <Box sx={{
            borderWidth: 3,
            borderColor: data.style.borderColor,
            backgroundColor: EColor.black,
            borderStyle: 'solid',
        }}>
            {children}
        </Box>
    );
};
