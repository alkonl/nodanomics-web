import React from 'react';
import {IDiagramNodeBaseData} from "../../../../interface";
import {Box, Typography} from "@mui/material";


export const TopToolBarHeaderDeprecated: React.FC<{
    elementData: Pick<IDiagramNodeBaseData, 'id' | 'name'>;
}> = ({elementData}) => {
    return (
        <Box sx={{
            display: 'flex',
            gap: '10px',
            padding: '8px'
        }}>
            <Typography>
                #{elementData.id} / {elementData.name}
            </Typography>
        </Box>
    );
};
