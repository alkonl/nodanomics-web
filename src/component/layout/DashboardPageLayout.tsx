import React from 'react';
import {Box, Typography} from "@mui/material";


export const DashboardPageLayout: React.FC<{
    pageName: string
    children?: React.ReactNode
}> = ({pageName, children}) => {


    return (
        <Box
            sx={{
                margin: 2,
                padding: 4,
                borderColor: 'text.primary',
                borderWidth: 2,
                borderStyle: 'solid',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,

            }}
        >
            <Typography variant="h4" sx={{
                fontWeight: 500,
                marginBottom: 2,
            }}>
                {pageName}
            </Typography>
            <Box sx={{
                display: 'flex',
                flex: 1,
                justifyContent: 'space-between',
                gap: 4,
                paddingBottom: 4,
            }}>
            {children}
            </Box>
        </Box>
    );
};
