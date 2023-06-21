import React from 'react';
import styles from './DashboardPage.module.scss';
import {DashboardHeader} from "../../component";

export const DashboardPage = () => {
    return (
        <div className={styles.wrapper}>
            <DashboardHeader/>
        </div>
    );
};