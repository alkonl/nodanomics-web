import React, {useEffect} from 'react';
import {z} from "zod";
import {FormPassword} from "../../base/FormInput";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useChangePasswordMutation} from "../../../api";
import {useNavigate} from "react-router-dom";
import {ELinks} from "../../../service/router";
import {Box, Button} from "@mui/material";

enum EFormFields {
    oldPassword = 'oldPassword',
    newPassword = 'newPassword',
    confirmNewPassword = 'confirmNewPassword',
}

const validationSchema = z.object({
    [EFormFields.oldPassword]: z.string().min(8),
    [EFormFields.newPassword]: z.string().min(8),
    [EFormFields.confirmNewPassword]: z.string().min(8),
}).refine((data) => data[EFormFields.newPassword] === data[EFormFields.confirmNewPassword], {
    path: [EFormFields.confirmNewPassword], // path of error
    message: "Password doesn't match",
});

type IValidationSchema = z.infer<typeof validationSchema>;

export const ChangePasswordForm: React.FC<{
    onCancel?: () => void
}> = ({onCancel}) => {
    const navigate = useNavigate();

    const form = useForm<IValidationSchema>({
        resolver: zodResolver(validationSchema),
    });


    const [changePassword, {isSuccess}] = useChangePasswordMutation()
    const onSubmit = (formData: IValidationSchema) => {
        changePassword({
            oldPassword: formData[EFormFields.oldPassword],
            newPassword: formData[EFormFields.newPassword],
        })
    }

    useEffect(() => {
        if (isSuccess) {
            navigate(ELinks.login)
        }
    }, [isSuccess])


    return (
        <Box
            sx={{
                backgroundColor: 'white',
                padding: 2,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
            onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit(onSubmit)();
            }}
            component="form"
        >
            <FormPassword label={{labelType: 'TEXT', text: 'old password'}} form={form}
                          name={EFormFields.oldPassword}/>
            <FormPassword label={{labelType: 'TEXT', text: 'the new password'}} form={form}
                          name={EFormFields.newPassword}/>
            <FormPassword label={{labelType: 'TEXT', text: 'confirm the new password'}} form={form}
                          name={EFormFields.confirmNewPassword}/>
            <Box
                sx={{
                    display: 'flex',
                    gap: '10px'
                }}
            >
                <Button
                    type="submit"
                    variant="contained"
                >confirm
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
