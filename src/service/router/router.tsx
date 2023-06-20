import {BrowserRouter, Routes} from "react-router-dom";
import React from "react";

export const AppRouter: React.FC<{ children: React.ReactNode }> = ({children}) => {
    return (<BrowserRouter>
        <Routes>
            {children}
        </Routes>
    </BrowserRouter>)
}