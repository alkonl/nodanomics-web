import React, {useEffect} from 'react';
import {LandingHeader} from "../../component";
import {Outlet, useNavigate} from "react-router-dom";
import {ELinks} from "../../service";
import {useCurrentPath} from "../../hooks/useCurrentPath";

export const LandingPage = () => {

    const navigate = useNavigate()
    const path = useCurrentPath()

    useEffect(() => {
        if (path === '/') {
            navigate(ELinks.projects)
        }
    }, [navigate])

    return (
        <>
            <LandingHeader/>
            <Outlet/>
        </>
    );
};
