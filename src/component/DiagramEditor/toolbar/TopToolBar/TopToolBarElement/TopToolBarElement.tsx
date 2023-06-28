import React from 'react';
import {IDiagramElementPreviewTooltip} from "../../../../../interface";
import {Box, Tooltip} from "@mui/material";

export const TopToolBarElement: React.FC<IDiagramElementPreviewTooltip> = ({preview, tooltip}) => {
    return (
        <Tooltip title={tooltip}>
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
