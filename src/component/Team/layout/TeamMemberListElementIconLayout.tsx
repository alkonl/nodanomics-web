import React from 'react';
import {Box} from "@mui/material";
import {EColor} from "../../../constant";

type TIConSize = 'small' | 'medium' | 'large'

const sizeMap: {
    [key in TIConSize]: number
} = {
    large: 60,
    medium: 32,
    small: 25,
}

const borderSizeMap: {
    [key in TIConSize]: number
} = {
    large: 2,
    medium: 1,
    small: 1,
}

export const TeamMemberListElementIconLayout: React.FC<{
    children?: React.ReactNode
    size?: 'small' | 'medium' | 'large'
}> = ({children, size = 'large'}) => {
    return (
        <Box sx={{
            position: 'relative',
            width: sizeMap[size],
            height: sizeMap[size],
        }}>
            <Box sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                borderWidth: borderSizeMap[size],
                borderColor: EColor.black,
                borderStyle: 'solid',
                backgroundColor: EColor.white,
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {children}
            </Box>
        </Box>
    );
};
