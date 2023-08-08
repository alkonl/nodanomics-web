import React, {useMemo} from 'react';
import {Box, Typography} from "@mui/material";
import {BASE_CHART_COLORS, EColor} from "../../../constant";
import ReactApexChart from "react-apexcharts";
import {useWidthAndHeight} from "../../../hooks";
import {useDiagramEditorState} from "../../../redux";
import {EDiagramNode, IVariableNodeData} from "../../../interface";
import {ApexOptions} from "apexcharts";



const options: ApexOptions = {
    colors: [EColor.darkRed],
    legend: {
        show: true,
        position: 'right',
    },
    tooltip: {
        enabled: true
    },
    chart: {
        background: EColor.grey,
        zoom: {
            enabled: true
        },
        parentHeightOffset: 0,
        toolbar: {
            show: true
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
        xaxis: {

            lines: {
                offsetX: 1,
                offsetY: 1,
                show: true
            }
        },
    }
}


export const ExecutionGraph = () => {

    const {elementRef, elementSize} = useWidthAndHeight()
    const {diagramNodes} = useDiagramEditorState()
    const filtered = diagramNodes.map(node=>node.data).filter((nodeData) => {
        if (nodeData.type === EDiagramNode.Variable) {
            return true
        }
    }) as IVariableNodeData[]

    const {series} = useMemo(() => {
        const chartData = filtered.map((data, index) => {
            const history = data.resourcesCountHistory
            const colorIndex = index % BASE_CHART_COLORS.length
            return {
                name: data.name,
                data: history || [],
                color: BASE_CHART_COLORS[colorIndex],
            }
        })
        return {
            series: chartData,
            isShowChart: true,
        }
    }, [filtered])
    return (
        <Box sx={{
            backgroundColor: EColor.white,
            padding: 1,
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
        }}>
            <Typography sx={{
                paddingBottom: 1,
            }}>
                Graph
            </Typography>
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
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
        </Box>
    );
};

