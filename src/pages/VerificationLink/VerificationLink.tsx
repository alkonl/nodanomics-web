import React, {useEffect, useMemo} from 'react';
import {useConsumeVerificationCodeMutation} from "../../api";
import {useNavigate, useSearchParams} from "react-router-dom";
import {ELinks} from "../../service/router";

export const VerificationLink = () => {
    const [consumeVerificationCode, {data}] = useConsumeVerificationCodeMutation();
    const navigate = useNavigate()

    const [searchParams] = useSearchParams();

    const submitEmailToken = useMemo(() => {
        const token = searchParams.get('token');
        return token ? token : undefined
    }, [searchParams])

    useEffect(() => {
        if (data === 'OK') {
            navigate(ELinks.main)
        }
    }, [data])

    return (
        <div>
            <h2>
                Verification link was sent to your email
            </h2>
            <br/>
            <hr/>
            <br/>
            {submitEmailToken && <button
                onClick={consumeVerificationCode}
            >
                Submit
            </button>}
        </div>
    );
};