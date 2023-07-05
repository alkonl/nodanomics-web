import React from 'react';
import {Box, Typography} from "@mui/material";
import {Outlet} from "react-router-dom";
import {AccountLayoutNav} from "./AccountLayoutNav";


export const AccountLayout = () => {


    return (
        <Box
            sx={{
                margin: 2,
                padding: 4,
                borderColor: 'text.primary',
                borderWidth: 2,
                borderStyle: 'solid',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Typography variant="h4" sx={{
                fontWeight: 500,
                marginBottom: 2,
            }}>
                Account
            </Typography>
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
                    <AccountLayoutNav/>
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
        </Box>
    );
};
