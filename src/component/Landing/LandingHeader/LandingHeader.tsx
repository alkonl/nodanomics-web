import React from 'react';

import {
    AppBar,
    Box,
    Container,
    Toolbar,
    Typography
} from "@mui/material";
import {LandingHeaderNavList} from "./LandingHeaderNavList";
import {UserToolBox} from "../UserToolBox";


export function LandingHeader() {


    return (
        <AppBar position="static" >
            <Container maxWidth={false}
                       sx={{
                           paddingRight: {xs: 0, md: 2},
                           paddingLeft: {xs: 0, md: 2},
                           flex: 1,
                       }}
            >
                <Toolbar disableGutters
                >
                    <Box
                        sx={{
                            borderRight: 1,
                            borderRightColor: 'text.primary',
                        }}
                    >
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: 'flex',
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>
                    </Box>

                    <LandingHeaderNavList/>

                    <UserToolBox/>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

