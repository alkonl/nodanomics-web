import React from 'react';
import {Box, Typography} from "@mui/material";
import {useSetupExecutionGraph} from "../../../../hooks";
import {ColorPicker} from "../../../ColorPicker";
import {useDiagramEditorState} from "../../../../redux";

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
            <Box sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'flex-end',
            }}>
                <Typography>
                    Grid color
                </Typography>
                <Box sx={{
                    width: 100
                }}>
                    <ColorPicker
                        onClose={changeGridColor}
                        value={gridColor}
                    />
                </Box>

            </Box>
        </Box>
    );
};
