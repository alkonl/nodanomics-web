import React from 'react';

import {
    AppBar,
    Box,
    Container,
    Toolbar,
} from "@mui/material";
import {LandingHeaderNavList} from "./LandingHeaderNavList";
import {UserToolBox} from "../UserToolBox";
import {Svg} from "../../../assets";


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
                        <Box sx={{
                            width: 150,
                            height: '100%',
                            marginRight: 1.5,
                        }}>
                            <Svg.NodanomicsLogoWithName/>

                        </Box>

                    </Box>

                    <LandingHeaderNavList/>

                    <UserToolBox/>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

