import React from 'react';
import {Button, ButtonGroup} from "@mui/material";
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import {EFontStyle} from "../../../interface";

const buttons = [
    {
        name: EFontStyle.Bold,
        Icon: FormatBoldIcon,
    }, {
        name: EFontStyle.Italic,
        Icon: FormatItalicIcon,
    }, {
        name: EFontStyle.Underline,
        Icon: FormatUnderlinedIcon,
    }
]

export const FormattingButtons = () => {
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

