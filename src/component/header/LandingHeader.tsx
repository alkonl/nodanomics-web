import React, {useMemo} from 'react';
import {Link} from "react-router-dom";
import {ELinks} from "../../service/router";
import {useLogOut, useSession} from "../../service/superTokens";
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import {Adb, Menu as MenuIcon} from '@mui/icons-material';
import {useSessionUserDataQuery} from "../../api";


export function LandingHeader() {
    const logOut = useLogOut(ELinks.login);

    const pages = [
        {
            name: 'Dashboard',
            link: ELinks.dashboard,
        }
    ]



    const {data: userData} = useSessionUserDataQuery(undefined)

    const settings = useMemo(()=>{
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
                link: ELinks.userManageData,
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
    },[userData])
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Adb sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            {pages.map((page) => (
                                <Link to={page.link} key={page.link}>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page.name}</Typography>
                                    </MenuItem>
                                </Link>
                            ))}
                        </Menu>
                    </Box>
                    <Adb sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {pages.map((page) => (
                            <Link to={page.link} key={page.name}>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{my: 2, color: 'white', display: 'block'}}
                                >
                                    {page.name}
                                </Button>
                            </Link>
                        ))}
                    </Box>

                    <Box sx={{flexGrow: 0, display: 'flex'}}>
                        <Typography>
                            Hi {userData?.firstName}
                        </Typography>
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
                </Toolbar>
            </Container>
        </AppBar>
    );
}

