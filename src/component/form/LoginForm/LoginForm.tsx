import React, {useEffect, useState} from 'react';
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useLoginEmailPasswordMutation} from "../../../api";
import {ELinks} from "../../../service/router";
import {useNavigate} from "react-router-dom";
import {FormPassword, FormText} from "../../base/FormInput";
import {GoogleSignInUpButton} from "../../button";
import {Box, Button, Typography} from "@mui/material";
import {GrayLine} from "../../base/GrayLine/GrayLine";

enum EFormFields {
    email = 'email',
    password = 'password',
}

const validationSchema = z.object({
    [EFormFields.email]: z.string().email(),
    [EFormFields.password]: z.string().min(8),
})

type IValidationSchema = z.infer<typeof validationSchema>;

export const LoginForm = () => {
    const navigate = useNavigate();
    const [formErrorMessage, setFormErrorMessage] = useState('')
    const form = useForm<IValidationSchema>({
        resolver: zodResolver(validationSchema),
    });

    const [loginEmailPassword, {isSuccess, error}] = useLoginEmailPasswordMutation();
    useEffect(() => {
        if (isSuccess) {
            navigate(ELinks.main);
        }
    }, [isSuccess])

    const onSubmit = async (data: IValidationSchema) => {
        await loginEmailPassword({
            email: data[EFormFields.email],
            password: data[EFormFields.password],
        });
    }
    useEffect(() => {
        if (error && 'error' in error) {
            setFormErrorMessage(error.error)
        }
    }, [error])
    const forgotPassword = () => {
        navigate(ELinks.forgotPassword);
    }

    const onRegister = () => {
        navigate(ELinks.register);
    }

    return (
        <Box
            style={{
                width: '320px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
            }}
        >
            <form onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit(onSubmit)();
            }}>

                <Box
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                    }}
                >
                    <FormText label="Email Address*" type="email" placeholder={'Email'} form={form}
                              name={EFormFields.email}/>
                    <FormPassword
                        placeholder="Please Type"
                        label={{
                            labelType: 'TEXT',
                            text: 'Password*',
                        }} form={form} name={EFormFields.password}/>
                    <Typography>
                        {formErrorMessage}
                    </Typography>
                    <Box
                        style={{
                            display: 'flex',
                            flexDirection: 'row-reverse'
                        }}
                    >
                        <Button
                            variant="text"
                            size="small"
                            onClick={forgotPassword}
                        >

                            <Typography style={{
                                fontSize: '10px',
                                fontWeight: 600,
                            }}>
                                forgot password?
                            </Typography>
                        </Button>
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                    >Login
                    </Button>
                </Box>
            </form>
            <GrayLine/>
            <GoogleSignInUpButton/>
            <Typography
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                Don&apos;t have an account?<Button
                variant="text"
                size="small"
                style={{
                    textTransform: 'none',
                    padding: 0,
                    paddingLeft: 4,
                }}
            >
                <Typography
                    onClick={onRegister}
                    style={{
                        fontWeight: 600,
                    }}>Register
                </Typography>
            </Button>
            </Typography>
        </Box>

    );
};
