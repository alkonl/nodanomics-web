import React, {useMemo} from 'react';
import {ForgotPasswordChangeEmailForm, ForgotPasswordSendEmailForm} from "../../component";
import {useSearchParams} from "react-router-dom";

export const ForgotPassword = () => {
    const [searchParams] = useSearchParams();

    const resetPasswordToken = useMemo(() => {
        const token = searchParams.get('token');
        return token ? token : undefined
    }, [searchParams])
    return (
        <div>
            ForgotPassword
            {!resetPasswordToken ? <ForgotPasswordSendEmailForm/> : <ForgotPasswordChangeEmailForm/>}
        </div>
    );
};
