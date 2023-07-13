import React from 'react';
import {BaseSectionDeprecated} from "./BaseSectionDeprecated";
import {FormControlLabel, Input} from "@mui/material";

export const RightToolbarElementSectionDeprecated = () => {
    return (
        <BaseSectionDeprecated title="Functions">
            <FormControlLabel control={<Input
                type="text"
               />} label="Label"/>
        </BaseSectionDeprecated>
    );
};
