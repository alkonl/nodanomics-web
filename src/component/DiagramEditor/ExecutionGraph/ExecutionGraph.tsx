import React, {useEffect, useMemo, useState} from 'react';
import {Box, Typography} from "@mui/material";
import {BASE_CHART_COLORS, EColor} from "../../../constant";
import ReactApexChart from "react-apexcharts";
import {useGetExecutionGraphPropertiesFromServer, useToggle, useWidthAndHeight} from "../../../hooks";
import {useDiagramEditorState} from "../../../redux";
import {EDiagramNode, IDataNodeData} from "../../../interface";
import {ApexOptions} from "apexcharts";
import {ExecutionGraphSetupPopUp} from "./ExecutionGraphSetup";
import {MButton} from "../../base";


const baseChartOptions = {
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
        borderColor: `${EColor.black}`,
        xaxis: {

            lines: {
                offsetX: 1,
                offsetY: 1,
                show: true
            }
        },
    }
} satisfies ApexOptions


export const ExecutionGraph = () => {
    const {currentDiagramId} = useDiagramEditorState()

    useGetExecutionGraphPropertiesFromServer({
        diagramId: currentDiagramId,
    })

    const [chartOptions, setChartOptions] = useState(baseChartOptions)

    const {executionGrid} = useDiagramEditorState()

    const executionGridProperties = executionGrid?.properties

    useEffect(() => {
        const updatedChartOptions = chartOptions
        if (executionGridProperties?.gridColor) {
            updatedChartOptions.grid.borderColor = executionGridProperties.gridColor
        }
        setChartOptions(updatedChartOptions)
    }, [executionGridProperties]);

    const graphSetupPopUpManager = useToggle()

    const {currentRunningDiagramStep} = useDiagramEditorState()

    const {elementRef, elementSize} = useWidthAndHeight()
    const {diagramNodes} = useDiagramEditorState()
    const filtered = diagramNodes.map(node => node.data).filter((nodeData) => {
        if (nodeData.type === EDiagramNode.Data) {
            return true
        }
    }) as IDataNodeData[]

    const {series} = useMemo(() => {
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

    return (
        <Box sx={{
            backgroundColor: EColor.white,
            padding: 1,
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
        }}>
            <ExecutionGraphSetupPopUp
                isShow={graphSetupPopUpManager.isOpened}
                onClose={graphSetupPopUpManager.close}
            />
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: 1,
            }}>
                <Typography>
                    Graph
                </Typography>
                <MButton.Submit
                    onClick={graphSetupPopUpManager.open}
                >
                    Setup
                </MButton.Submit>
            </Box>

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
                    options={baseChartOptions}
                    series={series}
                    type="line"
                />
            </Box>
        </Box>
    );
};

