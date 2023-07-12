import React from 'react';
import style from './RightToolbar.module.scss'
import {Box} from "@mui/material";
import {TopToolBarHeaderDeprecated} from "./TopToolBarHeaderDeprecated";
import {RightToolbarElementSectionDeprecated, RightToolbarStyleSectionDeprecated} from "./section";
import {useCurrentEditElement} from "../../../../hooks";


export const RightToolbarDeprecated = () => {
    const selectedElement = useCurrentEditElement()

    return (
        <Box className={style.container}>
            {selectedElement?.data && <TopToolBarHeaderDeprecated elementData={selectedElement.data}/>}
            <RightToolbarElementSectionDeprecated/>
            {selectedElement?.data && <RightToolbarStyleSectionDeprecated elementData={selectedElement.data}/>}
        </Box>
    );
};
