import React from 'react';
import {Box, Typography} from "@mui/material";
import {EColor} from "../../../../constant";
import {MButton, Parameter} from "../../../base";
import {RunningStep} from "../ElementToolbar/RunningStep";
import {
    useInvokeStep,
    useManageExecutionDuration,
    useManageTargetExecutionStep,
    useResetDiagramRun,
    useToggle
} from "../../../../hooks";
import {ExecutionGraphPopUp} from "../../ExecutionGraph";

export const ExecutionToolbar = () => {
    const executionGraphPopUp = useToggle();

    const {toggleStepInterval, isRunning, runStep} = useInvokeStep();
    const {executionDurationSeconds, changeExecutionDuration} = useManageExecutionDuration();
    const {targetSteps, changeTargetExecutionStep} = useManageTargetExecutionStep();
    const {resetDiagramRun} = useResetDiagramRun();

    const changeExecutionDurationHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        changeExecutionDuration(event.target.value);
    }

    const changeTargetExecutionStepHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        changeTargetExecutionStep(event.target.value);
    }

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
            <Box sx={{
                width: 80
            }}>
                <Parameter.Label sx={{
                    fontSize: 12,
                    textAlign: 'left',
                }}>
                    Speed

                </Parameter.Label>

                <Box sx={{
                    display: 'flex',
                    alignItem: 'end',
                }}>


                    <Parameter.Input
                        onChange={changeExecutionDurationHandler}
                        value={executionDurationSeconds}
                    />
                    <Typography>
                        s
                    </Typography>
                </Box>
            </Box>

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
            <Box sx={{
                display: 'flex',
            }}>
                <MButton.Submit>
                    Run to
                </MButton.Submit>
                <Parameter.Input
                    onChange={changeTargetExecutionStepHandler}
                    value={targetSteps}
                    sx={{
                        backgroundColor: EColor.white,
                    }}
                />
            </Box>
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

