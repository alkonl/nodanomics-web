import React from 'react';
// eslint-disable-next-line import/named
import {NodeProps} from "reactflow";
import {INodeData} from "../../../../interface";
import {Box} from "@mui/material";

export const BaseNodeShapeContainer: React.FC<{
    children: React.ReactNode
    node: NodeProps<INodeData>
    params: {
        width: number
        height: number
        clipPath: string
    }
}> = ({
          children,
          node,
          params
      }) => {
    return (
        <Box sx={{
            width: params.width + 4,
            height: params.height + 4,
            position: 'relative',
            clipPath: params.clipPath,
            backgroundColor: 'red',
        }}>
            <Box sx={{
                position: 'absolute',
                top: 2,
                left: 2,
                width: params.width,
                height: params.height,
                display: 'flex',
                flexDirection: 'column',
            }}>
                {children}
            </Box>
        </Box>
    );
};
