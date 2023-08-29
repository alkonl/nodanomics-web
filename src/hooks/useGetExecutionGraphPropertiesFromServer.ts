import {useGetExecutionGraphPropertiesQuery} from "../api";
import {useEffect} from "react";
import {diagramEditorActions, useAppDispatch} from "../redux";
import {BASE_CHART_OPTIONS} from "../constant";
import lodash from "lodash";

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
        if (executionGraphProperty) {
            const modifiedExecutionGraphProperty = lodash.cloneDeep(BASE_CHART_OPTIONS)
            if (executionGraphProperty.gridColor) {
                modifiedExecutionGraphProperty.grid.borderColor = executionGraphProperty.gridColor
            }
            if (executionGraphProperty.xAxisTitle) {
                modifiedExecutionGraphProperty.xaxis.title.text = executionGraphProperty.xAxisTitle
            }
            dispatch(diagramEditorActions.setExecutionGridProperties(modifiedExecutionGraphProperty))
        } else {
            dispatch(diagramEditorActions.setExecutionGridProperties(BASE_CHART_OPTIONS))
        }
    }, [executionGraphProperty]);
}
