import React, {useMemo} from "react";
import {Box} from "@mui/material";
import ReactApexChart from "react-apexcharts";
import {ApexOptions} from "apexcharts";
import {Parameter} from "../../../../base";
import {useExecutionGraphStepCount, useWidthAndHeight} from "../../../../../hooks";
import {EColor} from "../../../../../constant";
import {createChartSeries} from "../../../../../service/diagram/createChartSeries";
import {IDiagramNodeBaseData, INodeHistory} from "../../../../../interface";


const options: ApexOptions = {
    xaxis: {
        labels: {
            show: false,
        },
    },
    yaxis: {
        show: false,
    },
    colors: [EColor.darkRed],
    legend: {
        show: true,
        position: 'top',
    },
    tooltip: {
        enabled: false
    },
    chart: {
        background: EColor.darkMarineLight,
        zoom: {
            enabled: false
        },
        parentHeightOffset: 0,
        toolbar: {
            show: false
        },
        redrawOnParentResize: true,
    },
    stroke: {
        show: true,
        lineCap: 'butt',
        colors: undefined,
        width: 2,
        dashArray: 0,
    },
    grid: {
        borderColor: EColor.black,
        padding: {
            top: -29,
            right: 1,
            bottom: -13,
            left: 1,
        },
        xaxis: {

            lines: {
                offsetX: 1,
                offsetY: 1,
                show: true
            }
        },
    }
}

export const VariableStatisticsParameter: React.FC<{
    nodeData: IDiagramNodeBaseData & INodeHistory,
}> = ({nodeData}) => {
    const resourcesCountHistory = nodeData.history
    const stepCount = useExecutionGraphStepCount()

    const series = useMemo(() => createChartSeries(nodeData, 0, stepCount), [nodeData])

    const {elementRef, elementSize} = useWidthAndHeight()

    const avg = resourcesCountHistory && resourcesCountHistory.reduce((acc, b) => acc + b, 0) / resourcesCountHistory.length

    const min = resourcesCountHistory && Math.min(...resourcesCountHistory)
    const max = resourcesCountHistory && Math.max(...resourcesCountHistory)

    const avgFormatted = avg ? avg?.toFixed(2) : ''
    const maxFormatted = max ? max?.toFixed(2) : ''
    const minFormatted = min ? min?.toFixed(2) : ''

    return (
        <Box>
            <Box
                sx={{
                    width: '100%',
                    height: 120,
                    overflow: 'hidden',
                    borderColor: EColor.black,
                    borderWidth: 1,
                    borderStyle: 'solid',
                    boxSizing: 'border-box',
                }}
                ref={elementRef}
            >
                <ReactApexChart
                    width={elementSize.width}
                    height={elementSize.height}
                    options={options}
                    series={[series]}
                    type="line"
                />
            </Box>
            <Box sx={{
                paddingTop: 1,
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Box sx={{
                    display: 'flex',
                }}>
                    <Parameter.Text>
                        Max. Val.

                    </Parameter.Text>
                    <Parameter.Text sx={{
                        color: EColor.white,
                        display: 'inline-block',
                    }}>
                        {maxFormatted}
                    </Parameter.Text>
                </Box>
                <Box sx={{
                    display: 'flex',
                }}>
                    <Parameter.Text>
                        Avg. Val.

                    </Parameter.Text>
                    <Parameter.Text sx={{
                        color: EColor.white,
                        display: 'inline-block',
                    }}>
                        {avgFormatted}
                    </Parameter.Text>
                </Box>
                <Box sx={{
                    display: 'flex',
                }}>
                    <Parameter.Text>
                        Min. Val.

                    </Parameter.Text>
                    <Parameter.Text sx={{
                        color: EColor.white,
                        display: 'inline-block',
                    }}>
                        {minFormatted}
                    </Parameter.Text>
                </Box>


            </Box>

        </Box>
    )
}
