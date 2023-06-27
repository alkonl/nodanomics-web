import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormPassword, FormText} from "../../base/FormInput";
import {z} from "zod";
import {validation} from "../../../utils";
import {ChangePasswordPopUp} from "../../popUp";
import {useSessionUserDataQuery, useUpdateUserDataMutation} from "../../../api";

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
    [EFormFields.email]: validation.email,
    [EFormFields.password]: validation.firstName,
})

type IValidationSchema = z.infer<typeof validationSchema>;
export const ManageUserDataForm = () => {

    const {data: userData} = useSessionUserDataQuery(undefined)
    const [sendDataToUpdate] = useUpdateUserDataMutation()

    const [isChangePasswordPopUpOpen, setIsChangePasswordPopUpOpen] = useState(false)

    const form = useForm<IValidationSchema>({
        resolver: zodResolver(validationSchema),
    });

    useEffect(() => {
        if (userData) {
            form.reset({
                [EFormFields.firstName]: userData?.firstName,
                [EFormFields.lastName]: userData?.lastName,
                [EFormFields.phoneNumber]: userData?.phoneNumber !== null ? userData?.phoneNumber : '',
                [EFormFields.email]: userData?.email,
                [EFormFields.password]: '******',
            })
        }
    }, [userData])

    const onSubmit = (formData: IValidationSchema) => {
        sendDataToUpdate({
            firstName: formData[EFormFields.firstName],
            lastName: formData[EFormFields.lastName],
            phoneNumber: formData[EFormFields.phoneNumber],
        })
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
                            <FormPassword disabled={true} label={{
                                labelType: 'CHANGE_PASSWORD',
                                onChangePassword
                            }}
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

                <button
                    type="submit"
                >submit changes
                </button>
            </form>
        </div>
    );
};
