import React from 'react';
import {Box} from "@mui/material";
import style from './GrayLine.module.scss';
export const GrayLine = () => {
    return (
        <Box
            className={style.container}
        >
            <Box
                className={style.grayLine}
            />
            <Box
                className={style.text}
            >
                or
            </Box>
            <Box
                className={style.grayLine}
            />
        </Box>
    );
};
