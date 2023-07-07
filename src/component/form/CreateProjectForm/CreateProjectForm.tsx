import React, {useEffect} from 'react';
import {Box} from "@mui/material";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {validation} from "../../../utils";
import {MButton} from "../../base";
import {Text} from "../../base/Text";
import {FormText} from "../../base/FormInput";
import {useCreateProjectMutation} from "../../../api";

enum EFormFields {
    projectName = 'projectName',
}

const validationSchema = z.object({
    [EFormFields.projectName]: validation.projectName,
})

type IValidationSchema = z.infer<typeof validationSchema>;

export const CreateProjectForm: React.FC<{
    onSuccess: () => void;
}> = ({onSuccess}) => {
    const [createDiagram, {isSuccess}] = useCreateProjectMutation()
    const form = useForm<IValidationSchema>({
        resolver: zodResolver(validationSchema),
    });

    const onSubmit = (data: IValidationSchema) => {
        createDiagram({
            name: data.projectName,
        });
    }

    useEffect(() => {
        if (isSuccess) {
            onSuccess()
        }
    }, [isSuccess])

    return (
        <Box
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit(onSubmit)();
            }}
            component="form"
        >
            <Text.Label>
                First Name
            </Text.Label>
            <FormText name={EFormFields.projectName} form={form}/>
            <MButton.Submit type="submit">
                Create project  
            </MButton.Submit>
        </Box>
    );
};
