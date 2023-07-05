import React from 'react';
import {Box, Grid, Typography} from "@mui/material";

export const AccountPlan = () => {
    return (
        <Box
            sx={{
                px: 2,
                py: 5,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0.5,
                    textAlign: 'right',
                    width: 'fit-content',
                }}
            >
                <Typography>
                    NFT Type
                </Typography>
                <Typography>
                    Access Period
                </Typography>
                <Typography>
                    Price
                </Typography>
            </Box>
        </Box>
    );
};
