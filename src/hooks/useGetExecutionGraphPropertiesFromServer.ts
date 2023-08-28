import {useGetExecutionGraphPropertiesQuery} from "../api";
import {useEffect} from "react";
import {diagramEditorActions, useAppDispatch} from "../redux";

export const useGetExecutionGraphPropertiesFromServer = (
    {
        diagramId,
    }: {
        diagramId?: string,
    }) => {
    const dispatch = useAppDispatch()

    const {data: executionGraphProperty} = useGetExecutionGraphPropertiesQuery({
        diagramId,
    }, {
        skip: !diagramId,
    })

    useEffect(() => {
        console.log('executionGraphProperty', executionGraphProperty)
        if (executionGraphProperty) {
            dispatch(diagramEditorActions.setExecutionGridProperties(executionGraphProperty))
        }
    }, [executionGraphProperty]);
}
