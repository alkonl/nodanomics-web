import React from 'react';
import styles from './LandingPage.module.scss';
import {LandingHeader} from "../../component";
import {Outlet} from "react-router-dom";

export const LandingPage = () => {
    return (
        <>
            <LandingHeader/>
            <Outlet/>
        </>
    );
};
