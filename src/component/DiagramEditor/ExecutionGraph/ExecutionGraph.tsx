import React, {useMemo} from 'react';
import {Box, Typography} from "@mui/material";
import lodash from 'lodash'
import {BASE_CHART_COLORS, EColor} from "../../../constant";
import ReactApexChart from "react-apexcharts";
import {useToggle, useWidthAndHeight} from "../../../hooks";
import {useDiagramEditorState} from "../../../redux";
import {EDiagramNode, IDataNodeData} from "../../../interface";
import {ExecutionGraphSetupPopUp} from "./ExecutionGraphSetup";
import {MButton} from "../../base";
import {ApexOptions} from "apexcharts";


export const ExecutionGraph = () => {

    const {executionGrid} = useDiagramEditorState()


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


    const options = useMemo<ApexOptions | undefined>(() => {
        if (executionGrid?.options) {
            return lodash.cloneDeep(executionGrid.options)
        }
    }, [executionGrid?.options])

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
                    options={options}
                    series={series}
                    type="line"
                />
            </Box>
        </Box>
    );
};

