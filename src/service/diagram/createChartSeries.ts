import {IDiagramNodeBaseData, INodeHistory} from "../../interface";
import {BASE_CHART_COLORS} from "../../constant";

export const createChartSeries = (data:  IDiagramNodeBaseData & INodeHistory, index: number, stepCount: number) => {
    const history = data.history || []
    const colorIndex = index % BASE_CHART_COLORS.length
    const arrayWithZero = Array.from({length: stepCount - history.length}, () => 0)
    const formattedHistory = [...arrayWithZero, ...history]
    return {
        name: data.name,
        data: formattedHistory,
        color: BASE_CHART_COLORS[colorIndex],
    }

}
