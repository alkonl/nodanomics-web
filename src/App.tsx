import React from 'react';
import {RouterProvider} from "react-router-dom";
import {appRouter} from "./service/router/router";
import {SuperTokensInit} from "./service/superTokens/SuperTokensInit";


SuperTokensInit();
const App = () => {
    return (
            <RouterProvider router={appRouter}/>
    )
}

export default App
