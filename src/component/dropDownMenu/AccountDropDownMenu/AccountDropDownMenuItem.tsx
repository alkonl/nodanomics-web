import React, {useMemo} from 'react';
import {ELinks} from "../../../service/router";
import {Box, Menu, MenuItem, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useSessionUserDataQuery} from "../../../api";
import {useLogOut} from "../../../service/superTokens";

interface ILink {
    type: 'link',
    name: string,
    link: ELinks | string,
}

interface IButton {
    type: 'action',
    name: string,
    action: () => void
}

export type IAccountDropDownMenuTypes = (ILink | IButton)[]
export const AccountDropDownMenuItem: React.FC<{
    anchorElUser: HTMLElement | null
    handleCloseUserMenu: () => void
}> = ({anchorElUser, handleCloseUserMenu}) => {
    const logOut = useLogOut(ELinks.login);

    const {data: userData} = useSessionUserDataQuery(undefined)

    const userAccountMenuItems = useMemo(() => {
        const settingsBase: IAccountDropDownMenuTypes = [
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
    return (
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
            <Box
            sx={{p: 2}}
            >
                <Typography fontSize={16}>
                    {userData?.firstName} {userData?.lastName}
                </Typography>
                <Typography fontSize={12}>
                    {userData?.email}
                </Typography>

            {userAccountMenuItems.map((item) => {
                if (item.type === 'link') {
                    return (
                        <Link to={item.link} key={item.name}>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">{item.name}</Typography>
                            </MenuItem>
                        </Link>)
                } else if (item.type === 'action') {
                    return (
                        <MenuItem onClick={item.action} key={item.name}>
                            <Typography textAlign="center">{item.name}</Typography>
                        </MenuItem>
                    )
                }
            })}
            </Box>
        </Menu>
    );
};
