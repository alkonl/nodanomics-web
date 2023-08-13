import React, {useState} from 'react';

const GOOGLE_CLIENT_ID = '694773934628-9mn6fhab4igcsn4sb8uavtft15lgiido.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = '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'

const CLIENT_ID = GOOGLE_CLIENT_ID;
const REDIRECT_URI = 'http://localhost:8080/api/google/callback'; // Update with your actual callback URL

export const GoogleConnectButton: React.FC = () => {
    const handleGoogleLogin = async () => {
        // Redirect the user to the backend for Google login
        window.location.href = 'http://localhost:8080/api/google/login';
    };

    return (
        <div>
            <button onClick={handleGoogleLogin}>Login with Google</button>
        </div>
    );
};
