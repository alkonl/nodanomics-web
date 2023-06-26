import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormPassword, FormText} from "../../base/FormInput";
import {z} from "zod";
import {validation} from "../../../utils";
import {ChangePasswordPopUp} from "../../popUp";

enum EFormFields {
    firstName = 'firstName',
    lastName = 'lastName',
    phoneNumber = 'phoneNumber',
    email = 'email',
    password = 'password',
}

const validationSchema = z.object({
    [EFormFields.firstName]: validation.firstName,
    [EFormFields.lastName]: validation.lastName,
    [EFormFields.phoneNumber]: validation.phoneNumber,
})

type IValidationSchema = z.infer<typeof validationSchema>;
export const ManageUserDataForm = () => {
    const [isChangePasswordPopUpOpen, setIsChangePasswordPopUpOpen] = useState(false)

    const form = useForm<IValidationSchema>({
        resolver: zodResolver(validationSchema),
    });

    const onSubmit = (formData: IValidationSchema) => {

    }

    const onChangePassword = () => {
        setIsChangePasswordPopUpOpen(true)
    }
    const closeChangePasswordPopUp = () => {
        setIsChangePasswordPopUpOpen(false)
    }
    return (
        <div>
            <ChangePasswordPopUp onClose={closeChangePasswordPopUp} isShow={isChangePasswordPopUpOpen}/>
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
                    <tr>
                        <td>
                            <FormText disabled={true} label={'Email'} name={EFormFields.email} form={form}/>
                        </td>
                        <td>
                            <FormPassword disabled={true} onChangePassword={onChangePassword} labelType={'CHANGE_PASSWORD'}
                                          name={EFormFields.password} form={form}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <FormText label={'Phone Number'} name={EFormFields.phoneNumber} form={form}/>
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
