import React from 'react';
import {Box} from "@mui/material";
import {INodeData} from "../../../../interface";
// eslint-disable-next-line import/named
import {NodeProps} from "reactflow";
import {useIsElementExecuted, useUpdatePosAbsolute} from "../../../../hooks";
import './baseContainer.scss'
// eslint-disable-next-line import/named
import {SxProps} from "@mui/system/styleFunctionSx";

export const BaseNodeContainer: React.FC<{
    children: React.ReactNode
    node: NodeProps<INodeData>
    sx?: SxProps
}> = ({
          children,
          node,
          sx
      }) => {
    const {data} = node;
    const isPlayAnimation = useIsElementExecuted(data)

    // useUpdatePosAbsolute({
    //     nodeId: node.id,
    //     xPos: node.xPos,
    //     yPos: node.yPos
    // })

    return (
        <Box sx={{
            borderWidth: 3,
            borderColor: data.style.borderColor,
            borderStyle: 'solid',
            animation: isPlayAnimation ? 'containerBlink 0.2s linear 3' : 'none',
            ...sx
        }}>
            {children}
        </Box>
    );
};
