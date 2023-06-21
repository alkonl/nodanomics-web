import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useSignUpEmailPasswordMutation} from "../../../api";
import {FormText, FormPassword} from "../../base";
import {useNavigate} from "react-router-dom";

enum EFormFields {
    EMAIL = 'EMAIL',
    PASSWORD = 'PASSWORD',
}

const validationSchemaEmail = z.object({
    [EFormFields.EMAIL]: z.string().email(),
    [EFormFields.PASSWORD]: z.string().min(8),
    // firstName: z.string().min(3),
    // lastName: z.string().min(3),
    // phoneNumber: z.string().min(8),
});
type IValidationSchemaEmail = z.infer<typeof validationSchemaEmail>;

export const SignUpForm = () => {
    const navigate = useNavigate();

    const form = useForm<IValidationSchemaEmail>({
        resolver: zodResolver(validationSchemaEmail),
    });

    const [signUpEmailPassword, {isSuccess}] = useSignUpEmailPasswordMutation();
    const onSubmit = async (data: IValidationSchemaEmail) => {
        await signUpEmailPassword({
            email: data[EFormFields.EMAIL],
            password: data[EFormFields.PASSWORD],
        });
    }


    useEffect(() => {
        if (isSuccess) {
            navigate('/login');
        }
    }, [isSuccess])

    return (
        <div>
            SignUpForm
            <FormText placeholder={'Email'} form={form} name={EFormFields.EMAIL}/>
            <FormPassword placeholder={'password'} form={form} name={EFormFields.PASSWORD}/>
            <button onClick={
                form.handleSubmit(onSubmit)
            }>Register
            </button>
        </div>
    );
}