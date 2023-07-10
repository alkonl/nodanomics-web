import {useEffect, useState} from 'react';
import {checkIsBottom} from "../utils";


export const useScrollToBottom = (ref: React.RefObject<HTMLDivElement>, tolerance = 20): boolean => {
    const [isBottom, setIsBottom] = useState(false);

    useEffect(() => {
        const {current} = ref;
        let resizeObserver: ResizeObserver;

        const onScrollHandler = () => {
            if (current !== null && current !== undefined) {
                checkIsBottom(current, setIsBottom, tolerance);
            }
        }

        const observerHandler = () => {
            if (current !== null && current !== undefined) {
                const container = current;
                resizeObserver = new ResizeObserver(function () {
                    checkIsBottom(container, setIsBottom);
                });

                // This is the critical part: We observe the size of all children!
                for (let i = 0; i < container.children.length; i++) {
                    resizeObserver.observe(container.children[i]);
                }
            }
        }
        if (current !== null && current !== undefined) {
            new ResizeObserver(observerHandler).observe(current)
            current.addEventListener('scroll', onScrollHandler);
        }

        return () => {
            if (current !== null && current !== undefined) {
                current.removeEventListener('scroll', onScrollHandler);
            }
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
        };
    }, [ref, tolerance]);

    return isBottom;
};
