import React, {useMemo, useState} from 'react';
import {Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {ELinks} from "../../service/router";
import {useSessionUserDataQuery} from "../../api";
import {useLogOut} from "../../service/superTokens";

export const UserToolBox = () => {
    const logOut = useLogOut(ELinks.login);

    const {data: userData} = useSessionUserDataQuery(undefined)

    const settings = useMemo(() => {
        const settingsBase: ({
            type: 'link',
            name: string,
            link: ELinks | string,
        } | {
            type: 'action',
            name: string,
            action: () => void
        })[] = [
            {
                type: 'link',
                name: 'Profile',
                link: ELinks.accountManageData,
            }, {
                type: 'link',
                name: 'Log in',
                link: ELinks.login,
            }, {
                type: 'link',
                name: 'Register',
                link: ELinks.register,
            }, {
                type: 'link',
                name: 'Forgot password',
                link: ELinks.forgotPassword,
            }]
        if (userData) {
            settingsBase.push({
                type: 'action',
                name: 'Log out',
                action: logOut,
            })
        }
        return settingsBase
    }, [userData])


    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);


    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <Box sx={{flexGrow: 0, display: 'flex'}}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                    <Avatar alt="User Icon" src="/static/images/avatar/2.jpg"/>
                </IconButton>
            </Tooltip>
            <Menu
                sx={{mt: '45px'}}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {settings.map((setting) => {
                    if (setting.type === 'link') {
                        return (
                            <Link to={setting.link} key={setting.name}>
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting.name}</Typography>
                                </MenuItem>
                            </Link>)
                    } else if (setting.type === 'action') {
                        return (
                            <MenuItem onClick={setting.action} key={setting.name}>
                                <Typography textAlign="center">{setting.name}</Typography>
                            </MenuItem>
                        )
                    }
                })}
            </Menu>
        </Box>
    );
};
