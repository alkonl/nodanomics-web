import React, {useEffect, useState} from 'react';
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useLoginEmailPasswordMutation} from "../../../api";
import {ELinks} from "../../../service/router";
import {useNavigate} from "react-router-dom";
import {FormPassword, FormText} from "../../base";
import {GoogleSignInUpButton} from "../../button";

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
    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit(onSubmit)();
            }}>
                LoginForm
                <FormText type="email" placeholder={'Email'} form={form} name={EFormFields.email}/>
                <FormPassword placeholder={'password'} form={form} name={EFormFields.password}/>
                {formErrorMessage}
                <button
                    type="submit"
                >Login
                </button>
            </form>
            <br/>
            <GoogleSignInUpButton/>
            <br/>
            <button
                onClick={forgotPassword}
            >
                forgot password
            </button>
        </div>

    );
};