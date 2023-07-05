import React from 'react';
import {Avatar, Box, Typography} from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {useSessionUserDataQuery} from "../../api";

export const UserCard = () => {

    const {data: userData} = useSessionUserDataQuery(undefined)
    return (
        <Box
            sx={{
                backgroundColor: '#f1f1f1',
                // display: 'flex',
                // flexDirection: 'column',
                flex: 1,
            }}
        >
            <Box
                sx={{
                    backgroundColor: 'lightcoral',
                    height: '100px',
                    position: 'relative',
                }}
            >
                <Avatar
                    sx={{
                        width: 70,
                        height: 70,
                        position: 'absolute',
                        bottom: 0,
                        transform: 'translate(0%,50%)',
                        left: 32,
                    }}
                    alt="User logo" src="./avatar.png"
                />
            </Box>
            {userData && <Box
                sx={{
                    marginTop: '50px',
                    padding: '30px',
                    flex: 1,
                }}
            >
                <Typography
                    sx={{
                        fontSize: 26,
                        textDecoration: 'underline',
                        fontWeight: '600',
                    }}
                >
                    {userData.firstName} {userData.lastName}
                </Typography>
                <Box sx={{
                    marginTop: '15px'
                }}>
                    <Typography
                        sx={{
                            fontSize: 14,
                            color: 'gray',
                        }}
                    >
                        Company
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: 14,
                            color: 'gray',
                        }}
                    >
                        <LocationOnIcon sx={{
                            fontSize: 14,
                        }}/> City
                    </Typography>
                </Box>


            </Box>}
        </Box>
    );
};

