import React from 'react';
import styles from './LandingPage.module.scss';
import {DashboardHeader} from "../../component";

export const LandingPage = () => {
    return (
        <div className={styles.wrapper}>
            <DashboardHeader/>
        </div>
    );
};
