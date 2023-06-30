import {useEffect, useRef, useState} from "react";

// get width and height of rendered element
export const useWidthAndHeight = () => {
    const [elementSize, setElementSize] = useState({
        width: 0,
        height: 0,
    })
    const elementRef = useRef<HTMLDivElement>(null)
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    })
    useEffect(() => {
        function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            })

        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        if (elementRef.current !== null) {
            const {offsetHeight, offsetWidth} = elementRef.current
            setElementSize({
                height: offsetHeight,
                width: offsetWidth,
            })
        }
    }, [dimensions])
    return {elementSize, elementRef}
}
