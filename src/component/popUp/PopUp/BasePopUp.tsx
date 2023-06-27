import React from 'react';
import styles from './PopUp.module.scss';

export const BasePopUp: React.FC<{ children: React.ReactNode }> = ({
                                                                       children
                                                                   }) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
};
