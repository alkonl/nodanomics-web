import React from 'react';
import {Box} from "@mui/material";
import {INodeData} from "../../../../interface";
// eslint-disable-next-line import/named
import {NodeProps} from "reactflow";
import {useIsElementExecuted} from "../../../../hooks";
import './baseContainer.scss'
// eslint-disable-next-line import/named
import {SxProps} from "@mui/system/styleFunctionSx";
import {EColor} from "../../../../constant";

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

    console.log('data.style.borderColor: ', data.style.borderColor)
    return (
        <Box
            id="base-node-container"
            sx={{
                padding: '2px',
                borderWidth: 1,
                borderRadius: 2,
                borderColor: data.style.borderColor,
                borderStyle: 'solid',
                backgroundColor: EColor.darkMarine,
                animation: isPlayAnimation ? 'containerBlink 0.2s linear 3' : 'none',
                ...sx
            }}>
            {children}
        </Box>
    );
};
