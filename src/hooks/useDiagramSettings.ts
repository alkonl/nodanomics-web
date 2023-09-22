import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import {useGetDiagramSettingsQuery} from "../api";
import {useEffect} from "react";

export const useDiagramSettings = () => {
    const {currentDiagramId} = useDiagramEditorState()
    const dispatch = useAppDispatch()
    const {data: diagramSettings} = useGetDiagramSettingsQuery({diagramId: currentDiagramId}, {
        skip: !currentDiagramId
    })

    useEffect(() => {
        if (diagramSettings?.DiagramLayers) {
            dispatch(diagramEditorActions.setDiagramLayers(diagramSettings.DiagramLayers))

        }
    }, [diagramSettings,dispatch]);
}
