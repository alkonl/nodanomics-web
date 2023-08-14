import React from 'react';
import {MButton} from "../../base";
import {useCurrentUser} from "../../../hooks";

export const GoogleConnectButton: React.FC<{
    onSuccess?: () => Promise<void>;
}> = ({onSuccess}) => {

    const {currentUser} = useCurrentUser()

    const handleGoogleLogin = () => {
        if (currentUser) {
            window.open(
                `http://localhost:8080/api/google/login?userId=${currentUser.id}`,
                'Google Login',
                'width=600,height=600'
            );
        }

        window.addEventListener('message', async (event) => {
            if (event.origin === 'http://localhost:8080' && event.data.status === 'ok') {
                if (onSuccess) {
                   await onSuccess();
                }
            }
        });
    };

    return (
        <MButton.Submit
            onClick={handleGoogleLogin}
        >
            Connect to google
        </MButton.Submit>
    );
};
