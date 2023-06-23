import React, {useEffect} from 'react';
import {useSingInUpGoogleMutation} from "../../../api";

export const GoogleSignInUpButton = () => {
    const [signInUp, {data}] = useSingInUpGoogleMutation();

    useEffect(() => {
        if (data?.authUrl) {
            window.location.assign(data.authUrl);
        }
    }, [data])
    return (
        <button
            onClick={signInUp}
        >
            Google
        </button>
    );
};