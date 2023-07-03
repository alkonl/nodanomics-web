import React from 'react';
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormPassword} from "../../base/FormInput";
import {useSubmitNewPasswordMutation} from "../../../api";
import {useSupertokensError} from "../../../utils";
import {Box, Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {ELinks} from "../../../service/router";

enum EFormFields {
    password = 'password',
    confirmPassword = 'confirmPassword',
}

const validationSchema = z.object({
    [EFormFields.password]: z.string().min(8),
    [EFormFields.confirmPassword]: z.string().min(8),
}).refine((data) => data[EFormFields.password] === data[EFormFields.confirmPassword], {
    path: [EFormFields.confirmPassword], // path of error
    message: "Password doesn't match",
});

type IValidationSchema = z.infer<typeof validationSchema>;

export const ForgotPasswordChangeEmailForm = () => {
    const navigate = useNavigate()

    const [submitNewPassword, {isSuccess, error}] = useSubmitNewPasswordMutation()
    const form = useForm<IValidationSchema>({
        resolver: zodResolver(validationSchema),
    });
    const onSubmit = (formData: IValidationSchema) => {
        submitNewPassword({
            password: formData.password,
        })
    }

    useSupertokensError({error, form, fields: EFormFields})

    const onContinue = () => {
        navigate(ELinks.login)
    }

    return (
        <Box>
            {!isSuccess ? <Box
                    onSubmit={(e) => {
                        e.preventDefault()
                        form.handleSubmit(onSubmit)();
                    }}
                    component="form"
                    sx={{
                        width: '320px',
                        height: 'fit-content',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                    }}
                >
                    <Typography>
                        Reset password
                    </Typography>
                    <FormPassword label={{
                        labelType: 'TEXT',
                        text: 'enter the new password'
                    }}
                                  placeholder={'enter the new password'}
                                  form={form}
                                  name={EFormFields.password}/>
                    <FormPassword
                        label={{
                            labelType: 'TEXT',
                            text: 'confirm the password'
                        }}
                        placeholder={'confirm the password'}
                        form={form}
                        name={EFormFields.confirmPassword}/>

                    <Button
                        type="submit"
                    >change password
                    </Button>

                </Box>
                : <Box

                    sx={{
                        width: '320px',
                        height: 'fit-content',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                    }}>
                    <Typography>
                        Your Password was changed successfully
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={onContinue}
                    >
                        OK
                    </Button>
                </Box>}
        </Box>
    );
};

