import {useMemo} from "react";
import {
    IDiagramNodeBaseData,
    INodeHistory,
    isINodeHistory,
    isShowInExecutionGraphNode
} from "../interface";
import {useDiagramEditorState} from "../redux";
import {createChartSeries} from "../service/diagram/createChartSeries";
import {useExecutionGraphStepCount} from "./useExecutionGraphStepCount";


export const useExecutionGraphSeries = () => {

    const {diagramNodes} = useDiagramEditorState()

    const stepCount = useExecutionGraphStepCount()


    const filtered = diagramNodes.map(node => node.data).filter((nodeData) => {
        if (isINodeHistory(nodeData) && isShowInExecutionGraphNode(nodeData) && nodeData.isShowInExecutionGraphNode) {
            return true
        }
    }) as (IDiagramNodeBaseData & INodeHistory)[]
    return useMemo(() => {
        const chartData = filtered.map((data, index) => createChartSeries(data, index, stepCount))
        return {
            series: chartData,
        }
    }, [filtered])

}
