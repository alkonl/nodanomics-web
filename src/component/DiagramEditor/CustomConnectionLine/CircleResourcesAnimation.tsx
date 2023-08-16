import React, {useEffect} from "react";
import {EColor} from "../../../constant";



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
}> = ({parentId, id, begin, duration, play = false, infinite, cx, cy, path}) => {
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


    return (
        <>
            {play && <circle id={id} r="8" fill={EColor.black}
            >
                <animateMotion
                    repeatCount={0}
                    ref={animationRef}
                    dur={`${duration}.ms`}
                    begin={play ? `${begin}.ms` : 'indefinite'}
                    fill={'freeze'}
                    path={path}
                >
                </animateMotion>
            </circle>
            }
        </>
    )
}
