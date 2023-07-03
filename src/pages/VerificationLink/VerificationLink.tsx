import React, {useEffect, useMemo} from 'react';
import {useConsumeVerificationCodeMutation} from "../../api";
import {useNavigate, useSearchParams} from "react-router-dom";
import {ELinks} from "../../service/router";
import {Button, Typography} from "@mui/material";
import {AuthLayout} from "../../component/layout";

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
        <AuthLayout>
            {!submitEmailToken && <Typography
            sx={{
                fontWeight: 'bold'
            }}
            >
                Verification link was sent to your email
            </Typography>}
            {submitEmailToken && <>  <Typography
                sx={{
                    fontWeight: 'bold'
                }}
            >
                Press button to submit
            </Typography>
                <Button
                    onClick={consumeVerificationCode}
                >
                    Submit
                </Button>
            </>
            }
        </AuthLayout>
    );
};
