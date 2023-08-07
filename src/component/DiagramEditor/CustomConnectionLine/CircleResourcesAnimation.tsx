import React, {useEffect} from "react";
import {EColor} from "../../../constant";

export const CircleResourcesAnimation: React.FC<{
    parentId: string
    id: string
    begin: number
    duration: number
    infinite?: boolean
    play?: boolean
}> = ({parentId, id, begin, duration, play = false, infinite}) => {
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
                    if (play) {
                        timeOut = setTimeout(() => {
                            animationRef.current?.beginElement()
                        }, begin)
                    }
                }, duration)
            }
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
                    <animateMotion ref={animationRef} dur={play && `${duration}.ms`} begin={play && `${begin}.ms`}>
                        <mpath xlinkHref={`#${parentId}`}></mpath>
                    </animateMotion>
                </circle>
            }
        </>
    )
}
