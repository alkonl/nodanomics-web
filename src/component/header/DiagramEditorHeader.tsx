import React from 'react';
import {useDiagramEditorState} from "../../redux";
import {Box, Typography} from "@mui/material";
import {DiagramEditorDropDownMenu} from "../dropDownMenu";

export const DiagramEditorHeader = () => {
    const {name} = useDiagramEditorState()

    return (
        <Box
            sx={{
                display: 'flex',
                alignContent: 'center',
                gap: '20px',
                marginLeft: '20px'
            }}
        >
            <DiagramEditorDropDownMenu/>
            <Typography sx={{
                fontSize: 12
            }}>
                {name}
            </Typography>
        </Box>
    );
};
