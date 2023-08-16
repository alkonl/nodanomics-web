import React from 'react';
// eslint-disable-next-line import/named
import {BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath} from 'reactflow';
import {IChainConnectionData} from "../../../interface";
import {Box, Typography} from "@mui/material";
import {EDGE_Z_INDEX} from "../../../constant";

export const ChainConnection: React.FC<EdgeProps<IChainConnectionData>> = (
    {
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
        style = {},
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

    return (
        <>
            <BaseEdge
                path={edgePath}
                markerEnd={markerEnd}
                style={style}

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
