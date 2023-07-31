import React from 'react';
// eslint-disable-next-line import/named
import {BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath} from 'reactflow';
import {Box, Button} from "@mui/material";
import {diagramEditorActions, useAppDispatch} from "../../../redux";
import {EElementType, ILogicConnectionData} from "../../../interface";
import {EColor} from "../../../constant";

export const LogicConnection: React.FC<EdgeProps<ILogicConnectionData>> = (
    {
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
        style = {},
        markerEnd,
        data,
        id,
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
                        var: {data?.variableName ? data.variableName : '-'}
                    </Button>
                </Box>
            </EdgeLabelRenderer>
        </>
    );
};
