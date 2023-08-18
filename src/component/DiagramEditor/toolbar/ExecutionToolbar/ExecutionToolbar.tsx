import React from 'react';
import {Box} from "@mui/material";
import {EColor} from "../../../../constant";
import {MButton} from "../../../base";
import {RunningStep} from "../ElementToolbar/RunningStep";
import {useInvokeStep, useResetDiagramRun, useToggle} from "../../../../hooks";
import {ExecutionGraphPopUp} from "../../ExecutionGraph";

export const ExecutionToolbar = () => {
    const executionGraphPopUp = useToggle();

    const {toggleStepInterval, isRunning, runStep} = useInvokeStep();
    const {resetDiagramRun} = useResetDiagramRun();
    return (
        <Box sx={{
            pointerEvents: 'auto',
            display: 'flex',
            gap: 1,
            borderColor: EColor.grey2,
            borderStyle: 'solid',
            borderWidth: '1px',
            px: 3,
            py: 2,
            backgroundColor: EColor.white,
        }}>

            <MButton.Submit
                onClick={runStep}
            >
                Step
            </MButton.Submit>
            <MButton.Submit
                onClick={toggleStepInterval}
            >
                {isRunning ? 'Stop' : 'Start'}
            </MButton.Submit>
            <MButton.Submit onClick={resetDiagramRun}>
                Reset
            </MButton.Submit>
            <RunningStep/>
            <MButton.Submit onClick={executionGraphPopUp.open}>
                Execution Graph
            </MButton.Submit>
            <ExecutionGraphPopUp
                isShow={executionGraphPopUp.isOpened}
                onClose={executionGraphPopUp.close}
            />
        </Box>
    );
};

