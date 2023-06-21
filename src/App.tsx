import React from 'react';
import {RouterProvider} from "react-router-dom";
import {appRouter} from "./service/router";
import {SuperTokensInit} from "./service/superTokens";
import {SuperTokensWrapper} from "supertokens-auth-react";


SuperTokensInit();
const App = () => {
    return (
        <SuperTokensWrapper>
            <RouterProvider router={appRouter}/>
        </ SuperTokensWrapper>
    )
}

export default App
