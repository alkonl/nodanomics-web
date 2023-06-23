import React, {useEffect} from 'react';
import {useThirdPartySignInAndUpQuery} from "../../api";
import {useNavigate} from "react-router-dom";
import {ELinks} from "../../service/router";

export const AuthGoogle = () => {
    const navigate = useNavigate();
    const {data} = useThirdPartySignInAndUpQuery({})
    useEffect(()=>{
        if(data && data.status === 'OK'){
            navigate(ELinks.main)
        }
    },[data])
    return (
        <div>
            AuthGoogle
        </div>
    );
};
