import {useEffect, useRef, useState} from "react";

// get width and height of rendered element
export const useWidthAndHeight = () => {
    const [elementSize, setElementSize] = useState({
        width: 0,
        height: 0,
    })
    const elementRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (elementRef.current !== null) {
            const {offsetHeight, offsetWidth} = elementRef.current
            setElementSize({
                height: offsetHeight,
                width: offsetWidth,
            })
        }
    }, [])
    return {elementSize, elementRef}
}
