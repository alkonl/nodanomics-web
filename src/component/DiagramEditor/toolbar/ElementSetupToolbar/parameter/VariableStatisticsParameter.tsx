import React, {useMemo} from "react";
import {Box} from "@mui/material";
import ReactApexChart from "react-apexcharts";
import {ApexOptions} from "apexcharts";

import {useWidthAndHeight} from "../../../../../hooks";
import {EColor} from "../../../../../constant";
import {Parameter} from "../styledComponents";


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
        background: EColor.grey,
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
    resourcesCountHistory?: number[],
    min?: number,
    max?: number,
}> = ({resourcesCountHistory, min, max}) => {

    const {series} = useMemo(() => {
        const chartData = [{
            name: 'Resources',
            data: resourcesCountHistory || [],
        }]
        const isShowChart = resourcesCountHistory && resourcesCountHistory?.length > 0
        return {
            series: chartData,
            isShowChart,
        }
    }, [resourcesCountHistory])
    const {elementRef, elementSize} = useWidthAndHeight()

    const avg = resourcesCountHistory && resourcesCountHistory.reduce((acc, b) => acc + b, 0) / resourcesCountHistory.length

    const avgFormatted = avg && avg.toFixed(2)
    const maxFormatted = max && max.toFixed(2)
    const minFormatted = min && min.toFixed(2)

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
                    series={series}
                    type="line"
                />
            </Box>
            <Box sx={{
                paddingTop: 1,
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Parameter.Text>
                    Max. Val. {maxFormatted}
                </Parameter.Text>
                <Parameter.Text>
                    Avg. Val. {avgFormatted}
                </Parameter.Text>
                <Parameter.Text>
                    Min. Val. {minFormatted}
                </Parameter.Text>
            </Box>

        </Box>
    )
}
