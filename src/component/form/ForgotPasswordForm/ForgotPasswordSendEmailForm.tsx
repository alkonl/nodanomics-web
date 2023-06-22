import React from 'react';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {FormText} from "../../base";
import {useSendEmailToResetPasswordMutation} from "../../../api";

enum EFormFields {
    email = 'email',
}

const validationSchema = z.object({
    [EFormFields.email]: z.string().email(),
})

type IValidationSchema = z.infer<typeof validationSchema>;

export const ForgotPasswordSendEmailForm = () => {
    const form = useForm<IValidationSchema>({
        resolver: zodResolver(validationSchema),
    });
    const [sendResetPasswordLink] = useSendEmailToResetPasswordMutation();
    const onSubmit = async (data: IValidationSchema) => {
        await sendResetPasswordLink({
            email: data[EFormFields.email],
        });
    }
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit(onSubmit)();
            }}
        >
            <FormText type="email" placeholder={'Email'} form={form} name={EFormFields.email}/>
            <button
                type="submit"
            >send email
            </button>
        </form>
    );
};
