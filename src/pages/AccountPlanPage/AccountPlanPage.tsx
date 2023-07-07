import React from 'react';
import {AccountInnerLayout} from "../../component";
import {Box, Typography} from "@mui/material";

export const AccountPlanPage = () => {
    return (
        <AccountInnerLayout>
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
        </AccountInnerLayout>
    );
};
