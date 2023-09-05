import React, {useMemo} from 'react';
import {Box} from "@mui/material";
import {INodeData, isIIsElementExecuted} from "../../../../interface";
// eslint-disable-next-line import/named
import {NodeProps} from "reactflow";
import {useIsStepStarted} from "../../../../hooks";
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

    const isStepStarted = useIsStepStarted()

    const isPlayAnimation = useMemo(() => {
        if (isIIsElementExecuted(data)) {
            return isStepStarted && data.isExecuted
        }
        return false
    }, [isStepStarted])
    console.log('isPlayAnimation: ', isPlayAnimation)
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
