import {createBrowserRouter} from "react-router-dom";
import React from "react";
import {
    AuthGoogle,
    LandingPage,
    ForgotPassword,
    LoginPage,
    RegistrationPage,
    VerificationLink, DiagramEditorPage
} from "../../pages";
import {ELinks} from "./links";
import {DashboardPage} from "../../pages/DashboardPage";
import {AccountBilling, AccountLayout, AccountNFT, AccountPlan, AccountSettings} from "../../component";

export const appRouter = createBrowserRouter([
    {
        path: ELinks.main,
        element: <LandingPage/>,
        children: [{
            path: ELinks.accountManageData,
            element: <AccountLayout/>,
            children: [{
                path: ELinks.accountPlan,
                element: <AccountPlan/>
            }, {
                path: ELinks.accountBilling,
                element: <AccountBilling/>
            }, {
                path: ELinks.accountNFT,
                element: <AccountNFT/>
            }, {
                path: ELinks.accountSettings,
                element: <AccountSettings/>
            }]
        }]
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
        path: ELinks.dashboard,
        element: <DashboardPage/>
    }, {
        path: `${ELinks.diagram}/:diagramId`,
        element: <DiagramEditorPage/>
    }, {
        path: `${ELinks.diagram}`,
        element: <DiagramEditorPage/>
    }
]);
