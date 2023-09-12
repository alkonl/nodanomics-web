import {useParams} from "react-router-dom";
import {useGetProjectDiagramsQuery} from "../api";
import {useEffect} from "react";
import {useInfiniteScroll} from "./useInfiniteScroll";
import {diagramDashboardAction, useAppDispatch} from "../redux";

export const useDiagramDashboard = () => {
    const dispatch = useAppDispatch()
    const {cursorId, scrollRef, setParams, clearCursor} = useInfiniteScroll()

    console.log('cursorId: ', cursorId)
    const {projectId} = useParams<{ projectId: string }>()
    const {data: projectDiagrams, isFetching, refetch} = useGetProjectDiagramsQuery({
        projectId,
        cursorId,
    }, {
        skip: !projectId,
    })

    useEffect(() => {
        refetch()
    }, [cursorId]);

    useEffect(() => {
        if (!isFetching) {
            setParams({
                lastProjectId: projectDiagrams?.diagrams[projectDiagrams.diagrams.length - 1]?.id,
                isLoading: isFetching,
            })
        }
    }, [isFetching]);

    useEffect(() => {
        dispatch(diagramDashboardAction.setDiagrams({
            diagrams: projectDiagrams?.diagrams
        }))
    }, [projectDiagrams]);

    const updateDiagrams = () => {
        console.log('updateDiagrams')
        clearCursor()
        // refetch()
    }
    return {
        scrollRef,
        updateDiagrams,
    }
}
