import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useSendVerificationEmailMutation, useSignUpEmailPasswordMutation} from "../../../api";
import {FormText, FormPassword} from "../../base";
import {useNavigate} from "react-router-dom";
import {ELinks} from "../../../service/router";
import {useSupertokensError} from "../../../utils";

enum EFormFields {
    email = 'email',
    password = 'password',
    confirmPassword = 'confirmPassword',
    firstName = 'firstName',
    lastName = 'lastName',
    phoneNumber = 'phoneNumber',
}

const validationSchemaEmail = z.object({
    [EFormFields.email]: z.string().email(),
    [EFormFields.password]: z.string().min(8),
    [EFormFields.confirmPassword]: z.string().min(8),
    [EFormFields.firstName]: z.string().min(3),
    [EFormFields.lastName]: z.string().min(3),
    [EFormFields.phoneNumber]: z.string().refine((value) => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(value), 'Phone number is not valid. example +919367788755'),
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
        if(resVerificationEmail.isSuccess){
            navigate(ELinks.verificationLink);
        }
    }, [resVerificationEmail.isSuccess])

    useSupertokensError({error:resSignUp.error, form, fields: EFormFields});


    return (
        <div>
            SignUpForm
            <FormText placeholder={'Email'} form={form} name={EFormFields.email}/>
            <FormPassword placeholder={'password'} form={form} name={EFormFields.password}/>
            <FormPassword placeholder={'confirm password'} form={form} name={EFormFields.confirmPassword}/>
            <FormText placeholder={'first name'} form={form} name={EFormFields.firstName}/>
            <FormText placeholder={'last name'} form={form} name={EFormFields.lastName}/>
            <FormText placeholder={'phone number'} form={form} name={EFormFields.phoneNumber}/>
            <button onClick={
                form.handleSubmit(onSubmit)
            }>Register
            </button>
        </div>
    );
}