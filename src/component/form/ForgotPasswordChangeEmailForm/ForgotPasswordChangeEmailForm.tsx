import React from 'react';
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormPassword} from "../../base/FormInput";
import {useSubmitNewPasswordMutation} from "../../../api";
import {useSupertokensError} from "../../../utils";

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

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit(onSubmit)();
            }}>
                ForgotPasswordChangeEmailForm
                <FormPassword placeholder={'enter the new password'} form={form} name={EFormFields.password}/>
                <FormPassword placeholder={'confirm the password'} form={form} name={EFormFields.confirmPassword}/>

                <button
                    type="submit"
                >change password
                </button>
            </form>
            {isSuccess && <div>password was changed</div>}
        </div>
    );
};

