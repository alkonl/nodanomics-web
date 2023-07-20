import React from 'react';
import {IServerErrorResponse} from "../../../interface";
import {Box, Typography} from "@mui/material";

export const BaseServerError: React.FC<{
    error?: IServerErrorResponse;
}> = ({error}) => {
    return (
        <Box>
            {error && error.errorMessages.map(({message}) => (
                <Typography key={message}>
                    {message}
                </Typography>
            ))}
        </Box>
    );
};
