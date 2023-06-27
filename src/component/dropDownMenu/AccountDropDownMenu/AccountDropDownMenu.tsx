import React, { useState} from 'react';
import {Avatar, IconButton, Tooltip} from "@mui/material";
import {AccountDropDownMenuItem} from './AccountDropDownMenuItem';


export const AccountDropDownMenu = () => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <div>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                    <Avatar alt="User Icon" src="/static/images/avatar/2.jpg"/>
                </IconButton>
            </Tooltip>
            <AccountDropDownMenuItem
                anchorElUser={anchorElUser}
                handleCloseUserMenu={handleCloseUserMenu}
            />
        </div>
    );
};
