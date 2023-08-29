import {useMemo} from "react";
import {BASE_CHART_COLORS} from "../constant";
import {EDiagramNode, IDataNodeData} from "../interface";
import {useDiagramEditorState} from "../redux";

export const useExecutionGraphSeries = () => {

    const {diagramNodes, currentRunningDiagramStep} = useDiagramEditorState()
    const filtered = diagramNodes.map(node => node.data).filter((nodeData) => {
        if (nodeData.type === EDiagramNode.Data || nodeData.type === EDiagramNode.Formula) {
            return true
        }
    }) as IDataNodeData[]
    return useMemo(() => {
        console.log('filtered', filtered)
        const chartData = filtered.map((data, index) => {
            const history = data.history || []
            const colorIndex = index % BASE_CHART_COLORS.length
            const arrayWithZero = Array.from({length: currentRunningDiagramStep - history.length}, () => 0)
            const formattedHistory = [...arrayWithZero, ...history]
            return {
                name: data.name,
                data: formattedHistory,
                color: BASE_CHART_COLORS[colorIndex],
            }
        })
        return {
            series: chartData,
        }
    }, [filtered])

}
