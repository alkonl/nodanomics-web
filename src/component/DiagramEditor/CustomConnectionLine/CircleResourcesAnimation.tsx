import React, {useEffect, useMemo} from "react";
import {Position} from "reactflow";
import {EColor} from "../../../constant";


const endPosition: {
    [key in Position]: { x: number, y: number }
} = {
    [Position.Left]: {x: 40, y: 0},
    [Position.Right]: {x: -40, y: 0},
    [Position.Top]: {x: 0, y: 40},
    [Position.Bottom]: {x: 0, y: -40},
}

const getLastPoint = (path: string) => {
    const pathArray = path.split(' ')
    const lastPoint = pathArray[pathArray.length - 1]
    const [x, y] = lastPoint.split(',')
    return {x: parseFloat(x), y: parseFloat(y)}
}

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

    const animationRef = React.useRef<SVGAnimationElement>(null)
    const [isAnimationRunning, setIsAnimationRunning] = React.useState<boolean>(false)

    // const isInfinitiInitialStarter = React.useRef<boolean>(false)

    useEffect(() => {
        let timeOut: NodeJS.Timeout | undefined
        let interval: NodeJS.Timeout | undefined
        if (animationRef.current && play) {
            setIsAnimationRunning(true)
            if (!infinite) {
                animationRef.current?.beginElement()
                timeOut = setTimeout(() => {
                    setIsAnimationRunning(false)
                }, duration)
            } else {
                setIsAnimationRunning(true)
                animationRef.current?.beginElement()

                interval = setInterval(() => {
                    if (play) {
                        setIsAnimationRunning(true)
                        animationRef.current?.beginElement()
                    }
                    // isInfinitiInitialStarter.current = true
                }, duration + begin)
            }
        } else {
            setIsAnimationRunning(false)

            // isInfinitiInitialStarter.current = false
        }
        return () => {
            clearInterval(interval)
            clearTimeout(timeOut)
        }
    }, [play, begin]);

    useEffect(() => {
        console.log('isAnimationRunning: ', isAnimationRunning)
    }, [isAnimationRunning])


    const formattedPath = useMemo(() => {
        let _formattedPath = path
        const target = getLastPoint(path)
        const updatedEnd = {x: target.x + endPosition[targetPosition].x, y: target.y + endPosition[targetPosition].y}
        _formattedPath = `${_formattedPath} L ${updatedEnd.x},${updatedEnd.y}`
        return _formattedPath
    }, [sourcePosition, targetPosition, path])

    useEffect(() => {
        animationRef.current?.beginElement()
    }, [])

    return (
        <>
            <circle id={id} r={isAnimationRunning ? 8 : 0} fill={EColor.black}
            >
                <animateMotion
                    repeatCount={0}
                    ref={animationRef}
                    dur={`${duration}.ms`}
                    begin={isAnimationRunning ? `${begin}.ms` : 'indefinite'}
                    // begin={'indefinite'}
                    fill="freeze"
                    path={formattedPath}
                >
                    <mpath href={formattedPath}/>
                </animateMotion>
            </circle>
        </>
    )
}
