import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useSendVerificationEmailMutation, useSignUpEmailPasswordMutation} from "../../../api";
import {FormText, FormPassword} from "../../base/FormInput";
import {useNavigate} from "react-router-dom";
import {ELinks} from "../../../service/router";
import {useSupertokensError, validation} from "../../../utils";
import {Box, Button, Typography} from "@mui/material";

enum EFormFields {
    email = 'email',
    password = 'password',
    confirmPassword = 'confirmPassword',
    firstName = 'firstName',
    lastName = 'lastName',
    phoneNumber = 'phoneNumber',
}

const validationSchemaEmail = z.object({
    [EFormFields.email]: validation.email,
    [EFormFields.password]: validation.password,
    [EFormFields.confirmPassword]: validation.password,
    [EFormFields.firstName]: validation.firstName,
    [EFormFields.lastName]: validation.lastName,
    [EFormFields.phoneNumber]: validation.phoneNumber,
}).refine((data) => data[EFormFields.password] === data[EFormFields.confirmPassword], {
    path: [EFormFields.confirmPassword], // path of error
    message: "Password doesn't match",
});

type IValidationSchemaEmail = z.infer<typeof validationSchemaEmail>;

export const SignUpForm = () => {
    const navigate = useNavigate();

    const form = useForm<IValidationSchemaEmail>({
        resolver: zodResolver(validationSchemaEmail),
    });

    const [signUpEmailPassword, resSignUp] = useSignUpEmailPasswordMutation();
    const [sendVerificationEmail, resVerificationEmail] = useSendVerificationEmailMutation();
    const onSubmit = async (data: IValidationSchemaEmail) => {
        await signUpEmailPassword({
            email: data[EFormFields.email],
            password: data[EFormFields.password],
            firstName: data[EFormFields.firstName],
            lastName: data[EFormFields.lastName],
            phoneNumber: data[EFormFields.phoneNumber],
        });
    }


    useEffect(() => {
        if (resSignUp.isSuccess) {
            sendVerificationEmail({});
        }
    }, [resSignUp.isSuccess])

    useEffect(() => {
        if (resVerificationEmail.isSuccess) {
            navigate(ELinks.verificationLink);
        }
    }, [resVerificationEmail.isSuccess])

    useSupertokensError({error: resSignUp.error, form, fields: EFormFields});

    const onLogin = () => {
        navigate(ELinks.login);
    }

    return (
        <Box
            sx={{
                width: '320px',
                height: 'fit-content',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
            }}
        >
            <form
                onSubmit={
                    form.handleSubmit(onSubmit)
                }
            >
                <Box
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                    }}
                >


                    <FormText placeholder={'Email'} form={form} name={EFormFields.email}/>
                    <FormPassword
                        label={{
                            labelType: 'TEXT',
                            text: 'Password*',
                        }}
                        placeholder={'password'} form={form} name={EFormFields.password}/>
                    <FormPassword
                        label={{
                            labelType: 'TEXT',
                            text: 'Password*',
                        }}
                        placeholder={'confirm password'} form={form} name={EFormFields.confirmPassword}/>
                    <FormText label="first name" placeholder={'first name'} form={form} name={EFormFields.firstName}/>
                    <FormText label="last name" placeholder={'last name'} form={form} name={EFormFields.lastName}/>
                    <FormText label="phone number" placeholder={'phone number'} form={form}
                              name={EFormFields.phoneNumber}/>
                    <Button style={{
                        padding: '24px',
                    }} variant="contained" type="submit">
                        Register
                    </Button>
                </Box>
            </form>
            <Typography
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                Already have an account?<Button
                variant="text"
                size="small"
                style={{
                    textTransform: 'none',
                    padding: 0,
                    paddingLeft: 4,
                }}
            >
                <Typography
                    onClick={onLogin}
                    style={{
                        fontWeight: 600,
                    }}>Log in
                </Typography>
            </Button>
            </Typography>
        </Box>
    );
}
