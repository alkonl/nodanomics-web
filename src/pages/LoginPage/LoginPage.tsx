import React from 'react';
import {LoginForm} from "../../component";
import {Box, Typography} from "@mui/material";
import {AuthLayout} from "../../component/layout";

export const LoginPage = () => {
    return (
      <AuthLayout>
                <LoginForm/>
      </AuthLayout>
    );
};
