import React from 'react';
import {Box, Typography} from "@mui/material";
import {EColor} from "../../../constant";

export const ViewSimple: React.FC<{
    title: string,
    isBig?: boolean,
    isSelected?: boolean,
    onClick?: (event:  React.MouseEvent<HTMLButtonElement, MouseEvent> ) => void,
}> = ({title, isSelected, isBig, onClick}) => {
    return (
        <Box
            sx={{
                borderWidth: 1,
                borderColor: EColor.black,
                borderStyle: 'solid',
                width: 250,
                height: isBig ? 120 : 60,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                backgroundColor: isSelected ? EColor.grey2 : EColor.white,
            }}
            onClick={onClick}
            component="button"
        >
            <Typography
                sx={{
                    fontSize: 20,
                    fontWeight: 600,
                }}
            >
                {title}
            </Typography>
        </Box>
    );
};
