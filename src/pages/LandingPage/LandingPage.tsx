import React from 'react';
import styles from './LandingPage.module.scss';
import {LandingHeader} from "../../component";

export const LandingPage = () => {
    return (
        <div className={styles.wrapper}>
            <LandingHeader/>
        </div>
    );
};
