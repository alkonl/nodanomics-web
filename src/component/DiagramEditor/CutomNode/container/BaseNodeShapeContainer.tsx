import React from 'react';
// eslint-disable-next-line import/named
import {NodeProps} from "reactflow";
import {INodeData} from "../../../../interface";
import {Box} from "@mui/material";
// eslint-disable-next-line import/named
import {SxProps} from "@mui/system/styleFunctionSx";

export const BaseNodeShapeContainer: React.FC<{
    children: React.ReactNode
    node: NodeProps<INodeData>
    params: {
        width: number
        height: number
        clipPath: string
    },
    sxContentContainer?: SxProps
}> = ({
          children,
          node,
          params,
          sxContentContainer
      }) => {
    return (
        <Box sx={{
            width: params.width + 4,
            height: params.height + 5,
            position: 'relative',
            clipPath: params.clipPath,
            backgroundColor: node.data.style.borderColor,
        }}>
            <Box sx={{
                position: 'absolute',
                top: 3,
                left: 2,
                width: params.width,
                height: params.height,
                display: 'flex',
                flexDirection: 'column',
                ...sxContentContainer
            }}>
                {children}
            </Box>
        </Box>
    );
};
