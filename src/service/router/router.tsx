import {createBrowserRouter} from "react-router-dom";
import React from "react";
import {
    AuthGoogle,
    DashboardPage,
    ForgotPassword,
    LoginPage,
    ManageUserDataPage,
    RegistrationPage,
    VerificationLink
} from "../../pages";
import {ELinks} from "./links";
import {ProtectedRoute} from "./ProtectedRoute";

export const appRouter = createBrowserRouter([
    {
        path: ELinks.main,
        element: <DashboardPage/>,
    }, {
        path: ELinks.register,
        element: <RegistrationPage/>,
    }, {
        path: ELinks.verificationLink,
        element: <VerificationLink/>,
    }, {
        path: ELinks.login,
        element: <LoginPage/>,
    }, {
        path: ELinks.forgotPassword,
        element: <ForgotPassword/>,
    }, {
        path: ELinks.protected,
        element: <ProtectedRoute>
            protected
        </ProtectedRoute>,
    }, {
        path: ELinks.authGoogle,
        element: <AuthGoogle/>,
    },{
        path: ELinks.userManageData,
        element: <ManageUserDataPage/>
    }
]);
