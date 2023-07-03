import React, {useState} from 'react';
import {Popover} from "@mui/material";
import {HexColorPicker} from "react-colorful";

export const ColorPicker = () => {
    const [color, setColor] = useState<string| undefined>(undefined);

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
        <div>

            <button
                style={{
                    width: 40,
                    border: '1px solid gray',
                    height: 20,
                    borderRadius: 5,
                    padding: 4,
                }}
                onClick={handleClick}
            >
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: color,
                    }}
                />
            </button>

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
                <HexColorPicker color={color} onChange={setColor}/>
            </Popover>
        </div>
    );
};
