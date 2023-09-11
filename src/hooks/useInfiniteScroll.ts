import {useEffect, useRef, useState} from "react";
import {useScrollToBottom} from "./usePageBottom";

export const useInfiniteScroll = () => {
    const [params, setParams] = useState<{ lastProjectId?: string, isLoading?: boolean }>({})
    const {lastProjectId, isLoading} = params
    const [cursorId, setCursorId] = useState<string>();
    const scrollRef = useRef<HTMLDivElement>(null);
    const prevProjectCursorId = useRef<string>();
    const reachedBottom = useScrollToBottom(scrollRef)

    useEffect(() => {
        if (reachedBottom && lastProjectId && lastProjectId !== prevProjectCursorId.current && !isLoading) {
            prevProjectCursorId.current = lastProjectId
            setCursorId(lastProjectId)
        }
    }, [reachedBottom])

    return {
        cursorId,
        scrollRef,
        setParams: setParams,
    }
}
