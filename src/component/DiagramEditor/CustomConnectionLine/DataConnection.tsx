import React from 'react';
// eslint-disable-next-line import/named
import {BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath} from 'reactflow';
import {EElementType, IDataConnectionData} from "../../../interface";
import {diagramEditorActions, useAppDispatch} from "../../../redux";
import {Box, Button} from "@mui/material";
import {EColor, EDGE_Z_INDEX} from "../../../constant";

const CircleAnimation = () => {
    return (
        <circle cx="" cy="" r="8" fill="#529fd9">
            <animateMotion dur="1.6s" repeatCount="indefinite">
                <mpath xlinkHref="#wire"></mpath>
            </animateMotion>
        </circle>
    )
}

function SimpleEdgeWithAnimation({edgePath}: { edgePath: string; }) {
    return (
        <g>
            <path d={edgePath}
                  stroke="#529fd9" strokeWidth="2" fill="none" id="wire"></path>
            <circle cx="" cy="" r="8" fill="#529fd9">
                <animateMotion dur="1.6s" repeatCount="indefinite">
                    <mpath xlinkHref="#wire"></mpath>
                </animateMotion>
            </circle>
        </g>
    );
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
    const svg = 'M121.59 254L134.26 217.361H127.278L118.137 246.51H117.705L108.489 217.361H101.252L114.049 254H121.59Z'
    console.log('edge data',
        targetX,
        targetY,
        sourceX,
        sourceY,
        sourcePosition,
        targetPosition,
    )
    console.log('edge style', style, edgePath)




    return (
        <>
            {/*<SimpleEdgeWithAnimation edgePath={edgePath}/>*/}
            <CircleAnimation/>
            <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} id="wire"/>
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
