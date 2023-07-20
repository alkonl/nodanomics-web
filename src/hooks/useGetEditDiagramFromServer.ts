import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import {useGetDiagramByIdQuery} from "../api";
import {useEffect, useRef, useState} from "react";


export const useGetEditDiagramFromServer = () => {
    const {currentDiagramId} = useDiagramEditorState()
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
    const {setDiagramElements, setDiagramName,renderState} = diagramEditorActions



    useEffect(() => {
        const diagramData = diagramRes?.diagram
        if (diagramData && diagramData.elements !== null) {

            dispatch(setDiagramElements({
                diagramId: diagramData.id,
                nodes: diagramData.elements.diagramNodes || [],
                edges: diagramData.elements.diagramEdges || [],
            }))
            dispatch(setDiagramName({
                name: diagramData.name
            }))
            dispatch(renderState())
        } else {

            if (diagramData && diagramData.name) {
                dispatch(setDiagramName({
                    name: diagramData.name
                }))
            }
        }
        if (diagramRes?.diagram?.name) {
            setIsRequestLoaded(true)
        }
    }, [diagramRes, currentDiagramId])
    return {
        isRequestLoaded: isRequestLoaded,
    }
}
