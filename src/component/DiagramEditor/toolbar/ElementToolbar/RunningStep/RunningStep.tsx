import React from 'react';
import {Box} from "@mui/material";
import {useDiagramEditorState} from "../../../../../redux";
import {ParameterLabel} from "../../../../base/Label";
import {EColor} from "../../../../../constant";

export const RunningStep = () => {

    const {currentRunningDiagramStep} = useDiagramEditorState();

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <ParameterLabel sx={{
                margin: 0,
            }}>
                step:
            </ParameterLabel>
            <ParameterLabel sx={{
                fontSize: 20,
                fontWeight: 'bold',
                color: EColor.white,
                textAlign: 'center',
                margin: 0,
            }}>
                {currentRunningDiagramStep}
            </ParameterLabel>
        </Box>
    );
};
