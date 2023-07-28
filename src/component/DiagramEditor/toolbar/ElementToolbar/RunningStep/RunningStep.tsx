import React from 'react';
import {Box, Typography} from "@mui/material";
import {useDiagramEditorState} from "../../../../../redux";

export const RunningStep = () => {

    const {currentRunningDiagramStep} = useDiagramEditorState();

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Typography>
                step:
            </Typography>
            <Typography sx={{
                fontSize: 20,
                fontWeight: 'bold',
            }}>
                {currentRunningDiagramStep}
            </Typography>
        </Box>
    );
};
