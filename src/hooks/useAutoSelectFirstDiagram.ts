import {diagramDashboardAction, useAppDispatch, useDiagramDashboardState} from "../redux";
import {useEffect} from "react";

export const useAutoSelectFirstDiagram = () => {
    const dispatch = useAppDispatch()
    const {diagrams, selectedDiagramId} = useDiagramDashboardState()
    useEffect(() => {
        const isCanSelect = selectedDiagramId === undefined
            || diagrams.some(diagram => diagram.id === selectedDiagramId)
            || diagrams.length > 0
        const firstDiagramId = diagrams[0]?.id
        if (isCanSelect && firstDiagramId) {
            dispatch(diagramDashboardAction.setSelectedDiagramId({
                diagramId: firstDiagramId
            }))
        }
    }, [diagrams]);
}
