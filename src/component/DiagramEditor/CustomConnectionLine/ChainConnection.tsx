import React from 'react';
// eslint-disable-next-line import/named
import {BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath} from 'reactflow';
import {IChainConnectionData} from "../../../interface";
import {Box, Typography} from "@mui/material";
import {EDGE_Z_INDEX} from "../../../constant";
import './chainConnection.scss'
import {useIsStepStarted} from "../../../hooks";



export const ChainConnection: React.FC<EdgeProps<IChainConnectionData>> = (
    {
        id,
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
        markerEnd,
        data
    }
) => {
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });


    const isStepStarted = useIsStepStarted()

    const animationId = `animation-chain-${id}`

    const isPlayAnimation = isStepStarted && data?.isExecuted


    return (
        <>


            <BaseEdge
                path={edgePath}
                markerEnd={markerEnd}
                style={{
                    width: 20,
                    animation: isPlayAnimation ? 'blink 0.2s linear 3' : 'none', // 1s duration, 3 times
                }}
                id={animationId}
            />
            <EdgeLabelRenderer>
                <Box
                    sx={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        fontSize: 12,
                        zIndex: EDGE_Z_INDEX,
                        // everything inside EdgeLabelRenderer has no pointer events by default
                        // if you have an interactive element, set pointer-events: all
                        pointerEvents: 'all',
                    }}
                >
                    <Typography>
                        {data?.condition}
                    </Typography>
                </Box>
            </EdgeLabelRenderer>
        </>
    );
};
