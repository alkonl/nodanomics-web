import React from 'react';
import {BaseSection} from "./BaseSection";
import {FormControlLabel, Input} from "@mui/material";

export const RightToolbarElementSection = () => {
    return (
        <BaseSection title="Functions">
            <FormControlLabel control={<Input
                type="text"
               />} label="Label"/>
        </BaseSection>
    );
};
