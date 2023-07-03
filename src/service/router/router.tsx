import {createBrowserRouter} from "react-router-dom";
import React from "react";
import {
    AuthGoogle,
    LandingPage,
    ForgotPassword,
    LoginPage,
    ManageUserDataPage,
    RegistrationPage,
    VerificationLink, DiagramEditorPage
} from "../../pages";
import {ELinks} from "./links";
import {ProtectedRoute} from "./ProtectedRoute";
import {DashboardPage} from "../../pages/DashboardPage";

export const appRouter = createBrowserRouter([
    {
        path: ELinks.main,
        element: <LandingPage/>,
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
        path: ELinks.authGoogle,
        element: <AuthGoogle/>,
    }, {
        path: ELinks.userManageData,
        element: <ManageUserDataPage/>
    }, {
        path: ELinks.dashboard,
        element: <ProtectedRoute>
            <DashboardPage/>
        </ProtectedRoute>
    }, {
        path:`${ELinks.diagram}/:diagramId`,
        element: <DiagramEditorPage/>
    }
]);
