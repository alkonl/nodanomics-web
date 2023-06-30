import {useLayoutEffect, useRef, useState} from "react";
import useResizeObserver from "@react-hook/resize-observer";

// get width and height of rendered element
export const useWidthAndHeight = () => {
    const ref = useRef<HTMLDivElement | null>(null)
    const [elementSize, setSize] = useState({
        width: 0,
        height: 0,
    })

    useLayoutEffect(() => {
        if (ref !== null) {
            const node = ref.current
            if (!(node instanceof Element)) return
            setSize(node.getBoundingClientRect())
        }
    }, [ref])
    useResizeObserver(ref, (entry) => setSize(entry.contentRect))
    return {elementSize, elementRef: ref}
}
