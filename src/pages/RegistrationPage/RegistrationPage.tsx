import React from 'react';
import {SignUpForm} from "../../component";
import {Box, Typography} from "@mui/material";
import {AuthLayout} from "../../component/layout";

export const RegistrationPage = () => {
    return (
        <AuthLayout>
            <SignUpForm/>
        </AuthLayout>
    );
};
