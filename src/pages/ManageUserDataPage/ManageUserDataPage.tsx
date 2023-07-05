import React from 'react';
import {ManageUserDataForm} from "../../component/form/ManageUserDataForm";
import {Box} from "@mui/material";
import {ManageUserDataHeader, UserCard} from "../../component";

export const ManageUserDataPage = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
            }}
        >
            <ManageUserDataHeader/>
            <Box
                style={{
                    alignSelf: 'center',
                    width: 'fit-content',
                    gap: '30px',
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'space-between'
                }}
            >

                <Box
                    sx={{
                        width: 350,
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <UserCard/>
                </Box>

                <Box sx={{
                    width: 450
                }}>
                    <ManageUserDataForm/>
                </Box>
            </Box>
        </Box>
    );
};
