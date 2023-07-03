import React from 'react';
import {SignUpForm} from "../../component";
import {AuthLayout} from "../../component/layout";

export const RegistrationPage = () => {
    return (
        <AuthLayout>
            <SignUpForm/>
        </AuthLayout>
    );
};
