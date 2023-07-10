import React from 'react';
import {TeamMemberListElementIconLayout, TeamMemberListElementLayout} from "./layout";
import AddIcon from '@mui/icons-material/Add';
import {Typography, Box} from "@mui/material";

export const AddNewTeamMember = () => {
    return (
        <Box sx={{
            cursor: 'pointer',
        }}>
            <TeamMemberListElementLayout>

                <TeamMemberListElementIconLayout>
                    <AddIcon sx={{
                        fontSize: 30,
                    }}/>
                </TeamMemberListElementIconLayout>
                <Typography sx={{
                    fontWeight: 600,
                }}>
                    Add New User
                </Typography>
            </TeamMemberListElementLayout>
        </Box>

    );
};

