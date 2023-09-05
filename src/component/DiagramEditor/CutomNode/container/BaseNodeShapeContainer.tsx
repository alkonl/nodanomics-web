import React, {useMemo} from 'react';
// eslint-disable-next-line import/named
import {NodeProps} from "reactflow";
import {INodeData, isIIsElementExecuted} from "../../../../interface";
import {Box} from "@mui/material";
// eslint-disable-next-line import/named
import {SxProps} from "@mui/system/styleFunctionSx";
import {useIsStepStarted} from "../../../../hooks";
import './shapeContainer.scss'

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

    const isStepStarted = useIsStepStarted()

    const isPlayAnimation = useMemo(() => {
        if (isIIsElementExecuted(node.data)) {
            return isStepStarted && node.data.isExecuted
        }
        return false
    }, [isStepStarted])

    return (
        <Box sx={{
            width: params.width + 4,
            height: params.height + 5,
            position: 'relative',
            clipPath: params.clipPath,
            backgroundColor: node.data.style.borderColor,
            animation: isPlayAnimation ? 'shapeBlink 0.2s linear 3' : 'none',
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
