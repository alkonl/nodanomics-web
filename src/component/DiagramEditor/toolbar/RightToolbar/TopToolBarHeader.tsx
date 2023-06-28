import React from 'react';
import {IDiagramNode} from "../../../../interface";
import {Box, Typography} from "@mui/material";
import {RightToolbarStyleSection} from "./section";

export const TopToolBarHeader: React.FC<{
    elementInfo: Pick<IDiagramNode, 'id' | 'preview' | 'name'>;
}> = ({elementInfo}) => {
    return (
        <Box sx={{
            display: 'flex',
            gap: '10px',
            padding: '8px'
        }}>
            <Box sx={{
                width: 20,
            }}>
                <elementInfo.preview.Component/>
            </Box>

            <Typography>
                #{elementInfo.id} / {elementInfo.name}
            </Typography>
        </Box>
    );
};
