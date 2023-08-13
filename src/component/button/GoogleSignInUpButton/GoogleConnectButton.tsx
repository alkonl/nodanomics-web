import React, {useEffect, useState} from 'react';

const GOOGLE_CLIENT_ID = '694773934628-9mn6fhab4igcsn4sb8uavtft15lgiido.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = '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'

const CLIENT_ID = GOOGLE_CLIENT_ID;
const REDIRECT_URI = 'http://localhost:8080/api/google/callback'; // Update with your actual callback URL

export const GoogleConnectButton: React.FC = () => {
    const [accessToken, setAccessToken] = useState<string | null>(null);

    // useEffect(() => {
    //     // Set up an event listener to receive messages from the popup
    //     const handleMessage = (event: MessageEvent) => {
    //         // if (event.origin === 'http://localhost:8080/api/google/popup' && event.data.token) {
    //         if (event.origin === 'close-popup' && event.data.token) {
    //             // Handle the received token here
    //             console.log('Received event:', event);
    //             setAccessToken(event.data.token);
    //         }
    //     };
    //
    //     window.addEventListener('message', handleMessage);
    //
    //     return () => {
    //         window.removeEventListener('message', handleMessage);
    //     };
    // }, []);
    const handleGoogleLogin = () => {
        const popup = window.open(
            'http://localhost:8080/api/google/login',
            'Google Login',
            'width=600,height=600'
        );

        // window.addEventListener('close', () => {
        //
        // })
        // Set up an event listener to receive messages from the popup
        window.addEventListener('message', (event) => {
            if (event.origin === 'http://localhost:8080' && event.data.token) {
                if(popup) {
                    setAccessToken(event.data.token);
                    console.log('Received token:', event.data.token);
                    popup.postMessage('Hello Popup!', 'close-popup');
                    popup.close();
                }
            }
        });
    };

    return (
        <div>
            <button onClick={handleGoogleLogin}>Login with Google</button>
            {accessToken}
        </div>
    );
};
