import React from 'react';
import {Link} from "react-router-dom";
import {ELinks} from "../../service/router";
import {useSession} from "../../service/superTokens";

export const DashboardHeader = () => {
    const session = useSession();

    return (
        <div>
            <Link to="/register">Register</Link>
            <br/>
            <Link to={ELinks.login}>Log-in</Link>
            <br/>
            <br/>
            <hr/>
            <br/>
            {session?.accessTokenPayload.username}
            logged userId: {session?.userId}
        </div>
    );
};