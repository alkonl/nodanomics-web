import React from 'react';
import {Box, Button, Popover} from "@mui/material";
import {HexColorPicker} from "react-colorful";

export const ColorPicker: React.FC<{
    onChange?: (newColor: string) => void
    value?: string
}> = ({
          onChange,
          value,
      }) => {

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'ColorPicker' : undefined;
    return (
        <Box>

            <Button
                sx={{
                    width: '40px',
                    border: '1px solid gray',
                    height: '20px',
                    borderRadius: 5,
                    padding: '4px',
                }}
                onClick={handleClick}
            >
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: value,
                    }}
                />
            </Button>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <HexColorPicker color={value} onChange={onChange}/>
            </Popover>
        </Box>
    );
};
