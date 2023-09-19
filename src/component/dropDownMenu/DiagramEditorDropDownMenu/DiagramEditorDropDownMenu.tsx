import React, {useCallback, useState} from 'react';
import {Box, IconButton, Tooltip} from "@mui/material";
import {DiagramEditorDropDownMenuContent} from "./DiagramEditorDropDownMenuContent";
import {Svg} from "../../../assets";

export const DiagramEditorDropDownMenu = () => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = useCallback(() => {
        setAnchorElUser(null);
    }, [])
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{
                    p: 0,
                    width: 30,
                    height: 30,
                }}>
                    <Svg.NodanomicsLogo/>
                </IconButton>
            </Tooltip>
            <DiagramEditorDropDownMenuContent
                anchorEl={anchorElUser}
                close={handleCloseUserMenu}
            />
        </Box>
    );
};
