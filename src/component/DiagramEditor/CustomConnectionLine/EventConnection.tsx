import React from 'react';
// eslint-disable-next-line import/named
import {BaseEdge, EdgeProps, getBezierPath} from 'reactflow';
import {ILogicConnectionData} from "../../../interface";

export const EventConnection: React.FC<EdgeProps<ILogicConnectionData>> = (
    {
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
        style = {},
        markerEnd,
    }
) => {
    const [edgePath] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    return (
        <>
            <BaseEdge path={edgePath} markerEnd={markerEnd} style={style}/>
        </>
    );
};
