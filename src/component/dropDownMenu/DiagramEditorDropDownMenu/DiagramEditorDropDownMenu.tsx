import React, {useCallback, useState} from 'react';
import {Box, IconButton, Tooltip} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {DiagramEditorDropDownMenuContent} from "./DiagramEditorDropDownMenuContent";

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
                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                    <MenuIcon/>
                </IconButton>
            </Tooltip>
            <DiagramEditorDropDownMenuContent
                anchorEl={anchorElUser}
                close={handleCloseUserMenu}
            />
        </Box>
    );
};
