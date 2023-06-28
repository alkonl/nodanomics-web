import React, {useEffect} from 'react';
import {Box} from "@mui/material";
import styles from "./SideMenu.module.scss";

export const BaseSideMenu: React.FC<{
    isOpen: boolean;
    children: React.ReactNode
}> = ({isOpen, children}) => {
    const [classes, setClasses] = React.useState<string[]>([styles.sideMenu]);
    useEffect(() => {
        setClasses((prev) => {
            if (isOpen) {
                return [...prev, styles.isSideMenuOpen];
            }
            return prev.filter((className) => className !== styles.isSideMenuOpen);
        })
    }, [isOpen])
    return (
        <Box className={classes.join(' ')}>
            {children}
        </Box>
    );
};
