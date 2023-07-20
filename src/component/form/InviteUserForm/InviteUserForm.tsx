import React, {useEffect} from 'react';
import {z} from "zod";
import {serverErrorCheck, validation} from "../../../utils";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Box, Button} from "@mui/material";
import {Text} from "../../base/Text";
import {FormText} from "../../base/FormInput";
import {BaseServerError, MButton} from "../../base";
import {useInviteUserToProjectMutation} from "../../../api";

enum EFormFields {
    invitedUserEmail = 'invitedUserEmail',
}

const validationSchema = z.object({
    [EFormFields.invitedUserEmail]: validation.email,
})

type IValidationSchema = z.infer<typeof validationSchema>;

export const InviteUserForm: React.FC<{
    close: () => void
    projectId: string
}> = ({close, projectId}) => {

    const form = useForm<IValidationSchema>({
        resolver: zodResolver(validationSchema),
    });

    const [sendInviteUserToProject, {isSuccess: isSuccessfulInvited, error }] = useInviteUserToProjectMutation()

    const resError = serverErrorCheck(error)
    const onSubmit = (formData: IValidationSchema) => {
        sendInviteUserToProject({
            invitedUserEmail: formData.invitedUserEmail,
            projectId: projectId
        })
    }

    useEffect(() => {
        if (isSuccessfulInvited) {
            close()
        }
    }, [isSuccessfulInvited])

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
            <Box>
                <Box
                    sx={{
                        marginBottom: 2,
                    }}
                >
                    <Text.Label>
                        Invite user
                    </Text.Label>
                </Box>
                <FormText placeholder="type user email" name={EFormFields.invitedUserEmail} form={form}/>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '10px'
                }}
            >

                <Button
                    variant="outlined"
                    onClick={close}
                >
                    Cancel
                </Button>
                <MButton.Submit
                    type="submit"
                    variant="border"
                >
                    confirm
                </MButton.Submit>
            </Box>
            <BaseServerError error={resError}/>
        </Box>
    );
};
