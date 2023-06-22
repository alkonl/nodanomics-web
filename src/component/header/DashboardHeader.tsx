import React from 'react';
import {Link} from "react-router-dom";
import {ELinks} from "../../service/router";
import {useLogOut, useSession} from "../../service/superTokens";

export const DashboardHeader = () => {
    const session = useSession();
    const logOut = useLogOut(ELinks.login);

    return (
        <div>
            <Link to="/register">Register</Link>
            <br/>
            <Link to={ELinks.login}>Log-in</Link>
            <br/>
            <br/>
            <button onClick={logOut}>Log Out</button>
            <br/>
            <br/>
            <hr/>
            <br/>
            {session?.accessTokenPayload.username}
            logged userId: {session?.userId}
        </div>
    );
};