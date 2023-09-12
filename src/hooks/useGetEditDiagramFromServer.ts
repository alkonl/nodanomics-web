import {diagramEditorActions, useAppDispatch} from "../redux";
import {useGetDiagramByIdQuery} from "../api";
import {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {useGetExecutionGraphPropertiesFromServer} from "./useGetExecutionGraphPropertiesFromServer";


export const useGetEditDiagramFromServer = () => {


    const {diagramId: currentDiagramId} = useParams() as { diagramId: string }

    useGetExecutionGraphPropertiesFromServer({
        diagramId: currentDiagramId,
    })

    const dispatch = useAppDispatch()

    const [isRequestLoaded, setIsRequestLoaded] = useState(false)
    const prevDiagramId = useRef<string>()

    useEffect(() => {
        if (currentDiagramId !== prevDiagramId.current) {
            setIsRequestLoaded(false)
            prevDiagramId.current = currentDiagramId
        }
    }, [currentDiagramId])


    const {data: diagramRes} = useGetDiagramByIdQuery(currentDiagramId, {
        refetchOnMountOrArgChange: true,
    })
    const {setDiagram, renderState, resetDiagramRun} = diagramEditorActions



    useEffect(() => {
        console.log('diagramRes', diagramRes, {currentDiagramId})
        const diagramData = diagramRes?.diagram
        if (diagramData && diagramData.elements !== null) {

            dispatch(setDiagram({
                name: diagramData.name,
                diagramId: diagramData.id,
                nodes: diagramData.elements.diagramNodes,
                edges: diagramData.elements.diagramEdges,
            }))
            dispatch(resetDiagramRun())
            dispatch(renderState())
        } else if (diagramData) {
            dispatch(setDiagram({
                name: diagramData.name,
                diagramId: diagramData.id,
            }))
            dispatch(resetDiagramRun())
        }
        if (diagramRes?.diagram?.id) {
            setIsRequestLoaded(true)
        }
    }, [diagramRes, currentDiagramId])
    return {
        isRequestLoaded: isRequestLoaded,
    }
}
