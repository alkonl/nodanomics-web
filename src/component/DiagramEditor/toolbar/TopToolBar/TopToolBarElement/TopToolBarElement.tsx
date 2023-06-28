import React from 'react';
import {IDiagramNodePreview} from "../../../../../interface";
import {Box, Tooltip} from "@mui/material";

export const TopToolBarElement: React.FC<IDiagramNodePreview> = ({preview, type, name}) => {
    return (
        <Tooltip title={'name'}>
            <Box
                sx={{
                    padding: '2px',
                }}
            >
                <preview.Component/>
            </Box>
        </Tooltip>

    );
};
