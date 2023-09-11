import {useMemo} from "react";
import {BASE_CHART_COLORS} from "../constant";
import {
    EDiagramNode,
    IDataNodeData,
    IDiagramNodeBaseData,
    INodeHistory,
    IReactFlowCurtainNode,
    isINodeHistory,
    isShowInExecutionGraphNode
} from "../interface";
import {useDiagramEditorState} from "../redux";


export const useExecutionGraphSeries = () => {

    const {diagramNodes, currentRunningDiagramStep} = useDiagramEditorState()

    const assignedNode = diagramNodes
        .find(node => node.data.type === EDiagramNode.Data && node.data.isAssigned) as IReactFlowCurtainNode<IDataNodeData> || undefined
    const stepCount: number = assignedNode
        ? assignedNode.data.changeCount || 0
        : currentRunningDiagramStep

    const filtered = diagramNodes.map(node => node.data).filter((nodeData) => {
        if (isINodeHistory(nodeData) && isShowInExecutionGraphNode(nodeData) && nodeData.isShowInExecutionGraphNode) {
            return true
        }
    }) as (IDiagramNodeBaseData & INodeHistory)[]
    return useMemo(() => {
        const chartData = filtered.map((data, index) => {
            const history = data.history || []
            const colorIndex = index % BASE_CHART_COLORS.length
            const arrayWithZero = Array.from({length: stepCount - history.length}, () => 0)
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
