import React from 'react';
import {Outlet} from "react-router-dom";
import {Box} from "@mui/material";
import {DashboardPageLayout, AccountNav} from "../../component";

export const AccountPage = () => {
    return (
        <DashboardPageLayout pageName="Account">
            <Box
                sx={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'column',
                    borderColor: 'text.primary',
                    borderWidth: 2,
                    borderStyle: 'solid',
                    px: 2,
                    paddingTop: 4,
                    paddingBottom: 2,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        gap: 1,
                    }}
                >
                    <AccountNav/>
                </Box>

                <Box
                    sx={{
                        borderColor: 'text.primary',
                        borderWidth: 2,
                        borderStyle: 'solid',
                        flex: 1,
                    }}
                >
                    <Outlet/>
                </Box>
            </Box>
        </DashboardPageLayout>
    );
};
