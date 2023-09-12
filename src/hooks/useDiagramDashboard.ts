import {useParams} from "react-router-dom";
import {useGetProjectDiagramsQuery} from "../api";
import {useEffect} from "react";
import {useInfiniteScroll} from "./useInfiniteScroll";
import {diagramDashboardAction, useAppDispatch} from "../redux";

export const useDiagramDashboard = () => {
    const dispatch = useAppDispatch()
    const {cursorId, scrollRef, setParams, clearCursor} = useInfiniteScroll()

    const {projectId} = useParams<{ projectId: string }>()
    const {data: projectDiagrams, isLoading,} = useGetProjectDiagramsQuery({
        projectId,
        cursorId,
    }, {
        refetchOnMountOrArgChange: true,
        skip: !projectId,
    })

    useEffect(() => {
        if (!isLoading) {
            setParams({
                lastProjectId: projectDiagrams?.diagrams[projectDiagrams.diagrams.length - 1]?.id,
                isLoading,
            })
        }
    }, [projectDiagrams, isLoading]);

    useEffect(() => {
        dispatch(diagramDashboardAction.setDiagrams({
            diagrams: projectDiagrams?.diagrams
        }))
    }, [projectDiagrams]);

    // const clearCursor = () => {
    //     setParams({
    //         lastProjectId: undefined,
    //         isLoading: undefined,
    //     })
    // }
    return {
        scrollRef,
        clearCursor,
    }
}
