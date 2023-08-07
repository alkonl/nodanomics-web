import React from 'react';
// eslint-disable-next-line import/named
import {BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath} from 'reactflow';
import {EElementType, IDataConnectionData} from "../../../interface";
import {diagramEditorActions, useAppDispatch} from "../../../redux";
import {Box, Button} from "@mui/material";
import {EColor, EDGE_Z_INDEX} from "../../../constant";

const CircleAnimation: React.FC<{
    id: string
}> = ({id}) => {
    return (
        <circle cx="" cy="" r="8" fill="#529fd9">
            <animateMotion dur="1.6s" repeatCount="indefinite">
                <mpath xlinkHref={`#${id}`}></mpath>
            </animateMotion>
        </circle>
    )
}

export const DataConnection: React.FC<EdgeProps<IDataConnectionData>> = (
    {
        id,
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
    const dispatch = useAppDispatch()
    const {setEditElement} = diagramEditorActions

    const onClick = () => {
        dispatch(setEditElement({
            id,
            elementType: EElementType.Connection,
        }))
    }
    const animationCircleId = `animation-circle-${id}`

    return (
        <>
            <CircleAnimation id={animationCircleId}/>
            <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} id={animationCircleId}/>
            <EdgeLabelRenderer>
                <Box
                    sx={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        fontSize: 12,
                        pointerEvents: 'all',
                        zIndex: EDGE_Z_INDEX,
                    }}
                >
                    <Button
                        onClick={onClick}
                        sx={{
                            padding: 1,
                            minWidth: 20,
                            minHeight: 10,
                            fontSize: 12,
                            borderRadius: 1,
                            borderColor: EColor.blue,
                            borderStyle: 'solid',
                            borderWidth: 1,
                            backgroundColor: EColor.white,
                        }}
                    >
                        {data?.formula}
                    </Button>
                </Box>
            </EdgeLabelRenderer>
        </>
    );
};
