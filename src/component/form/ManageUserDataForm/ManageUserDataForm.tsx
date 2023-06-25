import React from 'react';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormPassword, FormText} from "../../base";
import {z} from "zod";

enum EFormFields {
    firstName = 'firstName',
    lastName = 'lastName',
    phoneNumber = 'phoneNumber',
}

const validationSchema = z.object({
    [EFormFields.firstName]: z.string().min(3),
    [EFormFields.lastName]: z.string().min(3),
    [EFormFields.phoneNumber]: z.string().min(8),
})

type IValidationSchema = z.infer<typeof validationSchema>;
export const ManageUserDataForm = () => {

    const form = useForm<IValidationSchema>({
        resolver: zodResolver(validationSchema),
    });

    const onSubmit = (formData: IValidationSchema) => {

    }
    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit(onSubmit)();
            }}>
                ManageUserDataForm
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <FormText label={'First Name'} name={EFormFields.firstName} form={form}/>
                        </td>
                        <td>
                            <FormText label={'Last Name'} name={EFormFields.lastName} form={form}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
                {/*<FormPassword placeholder={'the old password'} form={form} name={EFormFields.oldPassword}/>*/}
                {/*<FormPassword placeholder={'the new password'} form={form} name={EFormFields.newPassword}/>*/}
                {/*<FormPassword placeholder={'confirm the new password'} form={form} name={EFormFields.confirmNewPassword}/>*/}
                <button
                    type="submit"
                >change password
                </button>
            </form>
        </div>
);
};
