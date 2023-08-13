import React, {useEffect} from 'react';
import {useSingInUpGoogleMutation} from "../../../api";
import {Button} from "@mui/material";

export const GoogleSupertokensSignInUpButton = () => {
    const [signInUp, {data}] = useSingInUpGoogleMutation();

    useEffect(() => {
        if (data?.authUrl) {
            window.location.assign(data.authUrl);
        }
    }, [data])
    return (
        <Button
            variant="outlined"
            sx={{
                width: '100%',
                height: '48px',
                textTransform: 'none',
                fontSize: '14px',
                fontWeight: 'bold',
                borderWidth: '3px',
                borderRadius: '6px',
                backgroundColor: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
            }}
            onClick={signInUp}
        >
            Google
        </Button>
    );
};
