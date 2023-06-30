import React from 'react';
import {SignUpForm} from "../../component";
import {Box} from "@mui/material";

export const RegistrationPage = () => {
    return (
        <Box
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: '1',
        }}
        >
                <SignUpForm/>

        </Box>
    );
};
