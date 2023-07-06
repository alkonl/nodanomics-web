import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {FormText} from "../../base/FormInput";
import {useSendEmailToResetPasswordMutation} from "../../../api";
import {Box, Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {ELinks} from "../../../service";

enum EFormFields {
    email = 'email',
}

const validationSchema = z.object({
    [EFormFields.email]: z.string().email(),
})

type IValidationSchema = z.infer<typeof validationSchema>;

export const ForgotPasswordSendEmailForm = () => {

    const navigate = useNavigate();
    const form = useForm<IValidationSchema>({
        resolver: zodResolver(validationSchema),
    });
    const [sendResetPasswordLink, {data: resResetPassword}] = useSendEmailToResetPasswordMutation();
    const [infoText, setInfoText] = useState<string>()

    const onSubmit = async (data: IValidationSchema) => {
        await sendResetPasswordLink({
            email: data[EFormFields.email],
        });
    }

    const onBackToLogin = () => {
        navigate(ELinks.login)
    }

    useEffect(() => {
        if (resResetPassword && resResetPassword === 'OK') {
            setInfoText('Email sent')
        } else {
            setInfoText('Something went wrong. Try again later')
        }
    }, [resResetPassword])

    return (
        <Box
            sx={{
                width: '320px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
            }}
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit(onSubmit)();
            }}
            component="form"
        >
            <Typography
                sx={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: '20px',
                }}
            >
                Enter your email address and <br/> request a password reset
            </Typography>
            <FormText label="email" type="email" placeholder={'Email'} form={form} name={EFormFields.email}/>
            <Button
                variant="contained"
                type="submit"
                style={{
                    padding: '20px'
                }}
            >send email
            </Button>
            <Button
                variant="text"
                onClick={onBackToLogin}
                sx={{
                    textTransform: 'none',
                    fontWeight: 'bold',
                }}
            >
                Back to Login
            </Button>
            {infoText && <Typography>{infoText}</Typography>}
        </Box>
    );
};
