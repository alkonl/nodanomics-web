import React from 'react';
import {RouterProvider} from "react-router-dom";
import {appRouter} from "./service/router";
import {SuperTokensInit} from "./service/superTokens";
import {SuperTokensWrapper} from "supertokens-auth-react";
import {ThemeProvider} from "@mui/material";
import {theme} from "./utils/muiTheme";


SuperTokensInit();
const App = () => {
    return (
        <SuperTokensWrapper>
            <ThemeProvider theme={theme}>

            <RouterProvider router={appRouter}/>
            </ThemeProvider>
        </ SuperTokensWrapper>
    )
}

export default App
