import React, {useMemo} from 'react';
import {Box, Typography} from "@mui/material";
import lodash from 'lodash'
import {EColor} from "../../../constant";
import ReactApexChart from "react-apexcharts";
import {useExecutionGraphSeries, useToggle, useWidthAndHeight} from "../../../hooks";
import {useDiagramEditorState} from "../../../redux";
import {ExecutionGraphSetupPopUp} from "./ExecutionGraphSetup";
import {MButton} from "../../base";
import {ApexOptions} from "apexcharts";


export const ExecutionGraph = () => {

    const {executionGrid} = useDiagramEditorState()


    const graphSetupPopUpManager = useToggle()


    const {elementRef, elementSize} = useWidthAndHeight()

    const {series} = useExecutionGraphSeries()
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

