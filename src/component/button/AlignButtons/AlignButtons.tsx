import React from 'react';
import {Button, ButtonGroup} from "@mui/material";
import {EFontAlign} from "../../../interface";
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';

const buttons = [
    {
        name: EFontAlign.Left,
        Icon: FormatAlignLeftIcon,
    }, {
        name: EFontAlign.Right,
        Icon: FormatAlignRightIcon,
    }, {
        name: EFontAlign.Center,
        Icon: FormatAlignJustifyIcon,
    }
]

export const AlignButtons = () => {
    return (
        <ButtonGroup size="small" variant="outlined" aria-label="outlined primary button group">
            {buttons.map((button) => {
                return (
                    <Button key={button.name}>
                        <button.Icon/>
                    </Button>
                )
            })}
        </ButtonGroup>
    );
};
