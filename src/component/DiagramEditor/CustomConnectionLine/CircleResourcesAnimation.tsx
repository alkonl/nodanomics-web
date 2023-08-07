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
    const [isPlayed, setIsPlayed] = React.useState<boolean>(false)

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
                    console.log('interval:', id)
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
            <circle id={id} r="8" fill={EColor.black}>
                <animateMotion
                    repeatCount={0}
                    ref={animationRef}
                    dur={`${duration}.ms`}
                    begin={play ? `${begin}.ms` : 'indefinite'}
                >
                    <mpath xlinkHref={`#${parentId}`}></mpath>
                </animateMotion>
            </circle>

        </>
    )
}
