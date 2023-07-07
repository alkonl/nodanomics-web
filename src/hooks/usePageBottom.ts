import {useEffect, useRef, useState} from 'react';

export const useScrollToBottom = (ref: React.RefObject<HTMLDivElement>, tolerance = 20): boolean => {
    const [isBottom, setIsBottom] = useState(false);
    const prevScrollHeight = useRef(0);

    useEffect(() => {
        const {current} = ref;

        const onScroll = () => {
            const {scrollHeight, scrollTop, clientHeight} = current;
            // console.log('onScroll', {
            //     scrollHeight: scrollHeight,
            //     scrollTop: scrollTop,
            //     clientHeight: clientHeight,
            //     tolerance: tolerance,
            //     left: scrollHeight - (scrollTop + tolerance),
            //     isScrolledToBottom: current.scrollHeight - (current.scrollTop + tolerance) <= current.clientHeight
            // })
            const isScrolledToBottom =
                scrollHeight - (scrollTop + tolerance) <= clientHeight;

            // const isScrolledToBottom = scrollHeight - (clientHeight + 10)
            // console.log({
            //     isScrolledToBottom,
            //     prevScrollHeight: prevScrollHeight.current,
            //     scrollHeight,
            // })
            if (isScrolledToBottom) {
                setIsBottom(true);
            } else {
                setIsBottom(false);
            }
        };

        if (current !== null && current !== undefined) {
            current.addEventListener('scroll', onScroll);
        }

        return () => {
            if (current !== null && current !== undefined) {
                current.removeEventListener('scroll', onScroll);
            }
        };
    }, [ref, tolerance]);

    return isBottom;
};
