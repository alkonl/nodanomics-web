import React, {useEffect} from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import {Box} from "@mui/material";
import {DashboardPageLayout, AccountNav} from "../../component";
import {useCurrentPath} from "../../hooks/useCurrentPath";
import {ELinks} from "../../service";

export const AccountPage = () => {

    const navigate = useNavigate()
    const path = useCurrentPath()

    useEffect(() => {
        if (path === ELinks.accountManageData) {
            navigate(ELinks.accountPlan)
        }
    }, [navigate])

    return (
        <DashboardPageLayout pageName="Account">
            <Box
                sx={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'column',
                    borderColor: 'text.primary',
                    borderWidth: 2,
                    borderStyle: 'solid',
                    px: 2,
                    paddingTop: 4,
                    paddingBottom: 2,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        gap: 1,
                    }}
                >
                    <AccountNav/>
                </Box>

                <Box
                    sx={{
                        borderColor: 'text.primary',
                        borderWidth: 2,
                        borderStyle: 'solid',
                        flex: 1,
                    }}
                >
                    <Outlet/>
                </Box>
            </Box>
        </DashboardPageLayout>
    );
};
