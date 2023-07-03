import React from 'react';
import {LoginForm} from "../../component";
import {AuthLayout} from "../../component/layout";

export const LoginPage = () => {
    return (
      <AuthLayout>
                <LoginForm/>
      </AuthLayout>
    );
};
