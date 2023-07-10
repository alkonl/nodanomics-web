import React from 'react';
import {IDiagramNodeBaseData} from "../../../../interface";
import {Box, Typography} from "@mui/material";


export const TopToolBarHeader: React.FC<{
    elementData: Pick<IDiagramNodeBaseData, 'id' | 'preview' | 'name'>;
}> = ({elementData}) => {
    return (
        <Box sx={{
            display: 'flex',
            gap: '10px',
            padding: '8px'
        }}>
            <Box sx={{
                width: 20,
            }}>
                <elementData.preview.Component/>
            </Box>

            <Typography>
                #{elementData.id} / {elementData.name}
            </Typography>
        </Box>
    );
};
