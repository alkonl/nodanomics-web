import React, {useEffect, useMemo} from "react";
import {Position} from "reactflow";
import {EColor} from "../../../constant";
import {useDidMountEffect} from "../../../hooks";


export const CircleResourcesAnimation: React.FC<{
    parentId: string
    id: string
    begin: number
    duration: number
    infinite?: boolean
    play?: boolean
    cx: number
    cy: number
    path: string
    sourcePosition: Position
    targetPosition: Position
}> = ({id, begin, duration, play = false, infinite, sourcePosition, targetPosition, path, cy, cx}) => {
    const [isMount, setIsMount] = React.useState<boolean>(false)
    const animationRef = React.useRef<SVGAnimationElement>(null)

    useEffect(() => {
        let timeOut: NodeJS.Timeout | undefined
        let interval: NodeJS.Timeout | undefined
        if (animationRef.current && play) {
            if (!infinite) {
                timeOut = setTimeout(() => {
                    animationRef.current?.beginElement()
                }, begin)
            } else {
                interval = setInterval(() => {
                    animationRef.current?.beginElement()
                }, duration + begin)
            }
        }
        return () => {
            clearInterval(interval)
            clearTimeout(timeOut)

        }
    }, [animationRef, play, infinite]);


    const getLastPoint = (path: string) => {
        const pathArray = path.split(' ')
        const lastPoint = pathArray[pathArray.length - 1]
        const [x, y] = lastPoint.split(',')
        return {x: parseFloat(x), y: parseFloat(y)}
    }
    const endPosition: {
        [key in Position]: { x: number, y: number }
    } = {
        [Position.Left]: {x: 40, y: 0},
        [Position.Right]: {x: -40, y: 0},
        [Position.Top]: {x: 0, y: 40},
        [Position.Bottom]: {x: 0, y: -40},
    }

    const formattedPath = useMemo(() => {
        let _formattedPath = path
        const target = getLastPoint(path)
        const updatedEnd = {x: target.x + endPosition[targetPosition].x, y: target.y + endPosition[targetPosition].y}
        _formattedPath = `${_formattedPath} L ${updatedEnd.x},${updatedEnd.y}`


        return _formattedPath
    }, [sourcePosition, targetPosition, path])

    useDidMountEffect(() => {
        animationRef.current?.beginElement()
    }, [])

    return (
        <>
            {(play || infinite) && <circle id={id} r="8" fill={EColor.black}
            >
                <animateMotion
                    repeatCount={0}
                    ref={animationRef}
                    dur={`${duration}.ms`}
                    begin={play ? `${begin}.ms` : 'indefinite'}
                    fill="freeze"
                    path={formattedPath}
                >
                    <mpath href={formattedPath}/>
                </animateMotion>
            </circle>}
        </>
    )
}
