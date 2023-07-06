import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormMobileInput, FormPassword, FormText} from "../../base/FormInput";
import {z} from "zod";
import {validation} from "../../../utils";
import {ChangePasswordPopUp} from "../../popUp";
import {useSessionUserDataQuery, useUpdateUserDataMutation} from "../../../api";
import {Alert, Box, Button, Grid, Snackbar} from "@mui/material";
import {FormSelectInput} from "../../base/FormInput/FormSelectInput/FormSelectInput";
import {useToggle} from "../../../hooks/useToggle";


const MOCK_ROLE_LIST = [
    {
        id: '1',
        name: 'Client'
    }, {
        id: '2',
        name: 'Developer'
    }
]

enum EFormFields {
    firstName = 'firstName',
    lastName = 'lastName',
    phoneNumber = 'phoneNumber',
    email = 'email',
    password = 'password',
    bio = 'bio',
    companyName = 'companyName',
    clientRole = 'clientRole',
}

const validationSchema = z.object({
    [EFormFields.firstName]: validation.firstName,
    [EFormFields.lastName]: validation.lastName,
    [EFormFields.phoneNumber]: validation.phoneNumber,
    [EFormFields.email]: validation.email,
    [EFormFields.password]: validation.firstName,
    [EFormFields.companyName]: validation.companyName,
    [EFormFields.clientRole]: validation.clientRole,
})

type IValidationSchema = z.infer<typeof validationSchema>;
export const ManageUserDataForm = () => {

    const {data: userData} = useSessionUserDataQuery(undefined)
    const [sendDataToUpdate, {isSuccess: isUserDataUpdated}] = useUpdateUserDataMutation()

    const [isChangePasswordPopUpOpen, setIsChangePasswordPopUpOpen] = useState(false)
    const {
        open: openToastInfoChanged,
        close: closeToastInfoChanged,
        isOpened: isOpenToastInfoChanged
    } = useToggle()

    const form = useForm<IValidationSchema>({
        resolver: zodResolver(validationSchema),
    });

    const resetForm = () => {
        form.reset({
            [EFormFields.firstName]: userData?.firstName,
            [EFormFields.lastName]: userData?.lastName,
            [EFormFields.phoneNumber]: userData?.phoneNumber !== null ? userData?.phoneNumber : '',
            [EFormFields.email]: userData?.email,
            [EFormFields.password]: '******',
        })
    }

    useEffect(() => {
        if (userData) {
            resetForm()
        }
    }, [userData])

    useEffect(() => {
        if (isUserDataUpdated) {
            openToastInfoChanged()
        }
    }, [isUserDataUpdated])

    const onSubmit = (formData: IValidationSchema) => {
        sendDataToUpdate({
            firstName: formData[EFormFields.firstName],
            lastName: formData[EFormFields.lastName],
            phoneNumber: formData[EFormFields.phoneNumber],
        })
    }

    const onCancel = () => {
        resetForm()
    }

    const onChangePassword = () => {
        setIsChangePasswordPopUpOpen(true)
    }
    const closeChangePasswordPopUp = () => {
        setIsChangePasswordPopUpOpen(false)
    }
    return (
        <Box>
            <ChangePasswordPopUp onClose={closeChangePasswordPopUp} isShow={isChangePasswordPopUpOpen}/>
            <Snackbar
                open={isOpenToastInfoChanged}
                autoHideDuration={3000}
                onClose={closeToastInfoChanged}
            >
                <Alert onClose={closeToastInfoChanged} severity="info" sx={{width: '100%'}}>
                    Information was updated
                </Alert>
            </Snackbar>
            <Grid
                container
                rowSpacing={1}
                columnSpacing={{xs: 1, sm: 2, md: 3}}
                sx={{
                    paddingTop: 3,
                    paddingBottom: 3,
                }}
            >
                <Grid item sm={6} xs={12}>
                    <FormText label="First Name" name={EFormFields.firstName} form={form}/>
                </Grid>
                <Grid item sm={6} xs={12}>
                    <FormText label="Last Name" name={EFormFields.lastName} form={form}/>
                </Grid>
                <Grid item sm={6} xs={12}>
                    <FormText disabled={true} label="Email" name={EFormFields.email} form={form}/>
                </Grid>

                <Grid item sm={6} xs={12}>
                    <FormPassword
                        disabled={true}
                        label={{
                            labelType: 'CHANGE_PASSWORD',
                            onChangePassword
                        }}
                        name={EFormFields.password}
                        form={form}/>
                </Grid>
                <Grid item sm={6} xs={12}>
                    <FormSelectInput items={MOCK_ROLE_LIST} label="Role" name={EFormFields.clientRole} form={form}/>
                </Grid>
                <Grid item sm={6} xs={12}>
                    <FormText label="Company Name" name={EFormFields.companyName} form={form}/>
                </Grid>
                <Grid item xs={12}>
                    <FormText label="Bio" name={EFormFields.bio} form={form}/>
                </Grid>
                <Grid item sm={6} xs={12}>
                    <FormMobileInput form={form} name={EFormFields.phoneNumber} label="phone number (private)"/>
                </Grid>
            </Grid>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Button
                    onClick={() => {
                        form.handleSubmit(onSubmit)()
                    }}
                    variant="contained"
                >
                    Save
                </Button>
                <Button
                    onClick={onCancel}
                    variant="outlined"
                >
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};
