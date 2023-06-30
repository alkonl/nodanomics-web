import React from 'react';
import {LoginForm} from "../../component";
import {Box, Typography} from "@mui/material";

export const LoginPage = () => {
    return (
        <Box
            style={{
                display: 'flex',
                justifyContent: 'center',
                flex: '1',
            }}
        >
            <Box
                style={{
                    flex: '1',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <LoginForm/>
            </Box>
            <Box
                style={{
                    flex: '1',
                    backgroundColor: '#f5f5f5',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4">
                    Image
                </Typography>
            </Box>
        </Box>
    );
};
