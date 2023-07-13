import React from 'react';
// eslint-disable-next-line import/named
import {BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath} from 'reactflow';
import {Box, Button} from "@mui/material";
import {EElementType, IDataConnectionData} from "../../../interface";
import {diagramEditorActions, useAppDispatch} from "../../../redux";

export const DataConnection: React.FC<EdgeProps<IDataConnectionData>> = ({
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
                                                                         }) => {
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });
    const dispatch = useAppDispatch()
    const {setEditNode} = diagramEditorActions

    const onClick = () => {
        dispatch(setEditNode({
            id,
            type: EElementType.Connection,
        }))
    }
    return (
        <>
            <BaseEdge path={edgePath} markerEnd={markerEnd} style={style}/>
            <EdgeLabelRenderer>
                <Box
                    sx={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        fontSize: 12,
                        // everything inside EdgeLabelRenderer has no pointer events by default
                        // if you have an interactive element, set pointer-events: all
                        pointerEvents: 'all',
                    }}
                >
                    <Button onClick={onClick}>
                        Data Connection
                    </Button>
                    formula: {data?.formula}
                </Box>
            </EdgeLabelRenderer>
        </>
    );
};
