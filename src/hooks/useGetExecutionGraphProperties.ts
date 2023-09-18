import {useGetExecutionGraphPropertiesQuery} from "../api";
import {useEffect} from "react";
import {diagramEditorActions, useAppDispatch} from "../redux";
import {BASE_CHART_OPTIONS} from "../constant";
import lodash from "lodash";
import {useGetAssignedNode} from "./useGetAssignedNode";

export const useGetExecutionGraphProperties = (
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
    const assignedNode = useGetAssignedNode()

    useEffect(() => {
        const optionsToSave = lodash.cloneDeep(BASE_CHART_OPTIONS)
        if (executionGraphProperty) {
            // const modifiedExecutionGraphProperty = lodash.cloneDeep(BASE_CHART_OPTIONS)
            if (executionGraphProperty.gridColor) {
                optionsToSave.grid.borderColor = executionGraphProperty.gridColor
            }
            if (executionGraphProperty.xAxisTitle) {
                optionsToSave.xaxis.title.text = executionGraphProperty.xAxisTitle
            }
            if (executionGraphProperty.isShowVerticalGridLines !== undefined) {
                optionsToSave.grid.xaxis.lines.show = executionGraphProperty.isShowVerticalGridLines
            }
        }
        if (assignedNode?.data.name) {
            optionsToSave.xaxis.title.text = assignedNode?.data.name
        }
        dispatch(diagramEditorActions.setExecutionGridProperties(optionsToSave))

    }, [executionGraphProperty, assignedNode?.data.name]);
}
