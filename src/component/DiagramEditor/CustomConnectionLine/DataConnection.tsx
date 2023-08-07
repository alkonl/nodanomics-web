import React, {useEffect, useState} from 'react';
// eslint-disable-next-line import/named
import {BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath} from 'reactflow';
import {EElementType, IDataConnectionData} from "../../../interface";
import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../../../redux";
import {Box, Button} from "@mui/material";
import {DIAGRAM_RUN_DURATION, EColor, EDGE_Z_INDEX} from "../../../constant";

const CircleAnimation: React.FC<{
    parentId: string
    id: string
    begin: number
    duration: number
    infinite?: boolean
    play?: boolean
}> = ({parentId, id, begin, duration, play = false}) => {
    const animationRef = React.useRef<SVGAnimationElement>(null)

    // useTimeout(() => {
    //     animationRef.current?.beginElement()
    // }, begin, [animationRef])

    useEffect(() => {
        let timeOut: NodeJS.Timeout | undefined
        let interval: NodeJS.Timeout | undefined
        if (animationRef.current && play) {
            timeOut = setTimeout(() => {
                animationRef.current?.beginElement()
            }, begin)
            // interval = setInterval(() => {
            //     if (play) {
            //         timeOut = setTimeout(() => {
            //             animationRef.current?.beginElement()
            //         }, begin)
            //     }
            // }, duration)
        }
        return () => {
            if (timeOut) {
                clearInterval(interval)
                clearTimeout(timeOut)
            }
        }
    }, [animationRef, play]);

    return (
        <>
            {play &&
                <circle id={id} r="8" fill={EColor.black}>
                    <animateMotion ref={animationRef} dur={`${duration}.ms`} begin={`${begin}.ms`}>
                        <mpath xlinkHref={`#${parentId}`}></mpath>
                    </animateMotion>
                </circle>
            }
        </>
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
    const {isDiagramRunning} = useDiagramEditorState()
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

    const [circleCount, setCircleCount] = useState<number>(data?.formula ? parseInt(data.formula) : 0)

    useEffect(() => {
        setCircleCount(data?.formula ? parseInt(data.formula) : 0)
    }, [data?.formula]);

    return (
        <>
            {Array.from({length: circleCount}).map((_, index) => {
                const delay = index * 50
                return (
                    <CircleAnimation
                        play={isDiagramRunning}
                        duration={DIAGRAM_RUN_DURATION - delay - 100}
                        begin={delay}
                        key={index} parentId={animationCircleId}
                        id={`${animationCircleId}-${index}`}
                    />
                )
            })}
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
