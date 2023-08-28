import React from 'react';
import {Box, Typography} from "@mui/material";
import {useSetupExecutionGraph} from "../../../../hooks";
import {ColorPicker} from "../../../ColorPicker";
import {useDiagramEditorState} from "../../../../redux";
import {ParameterInput} from "../../../base";
import {ParameterExecutionGraphSetup} from "./styledComponent";

export const ExecutionGraphSetup = () => {

    const {changeGridColor} = useSetupExecutionGraph();
    const {executionGrid} = useDiagramEditorState()
    const {gridColor} = executionGrid?.properties || {};

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
        }}>
            <Box>
                <Typography sx={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                }}>
                    Grid setup
                </Typography>
            </Box>
            <Box>
                <ParameterExecutionGraphSetup.Container>
                    <ParameterExecutionGraphSetup.Element label="Grid color">
                        <ColorPicker
                            onClose={changeGridColor}
                            value={gridColor}
                        />
                    </ParameterExecutionGraphSetup.Element>
                    <ParameterExecutionGraphSetup.Element label="X axis title">
                        <ParameterInput/>
                    </ParameterExecutionGraphSetup.Element>
                </ParameterExecutionGraphSetup.Container>
            </Box>

        </Box>
    );
};
