import React, {useEffect} from 'react';
import {Box} from "@mui/material";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {validation} from "../../../utils";
import {MButton} from "../../base";
import {Text} from "../../base/Text";
import {FormText} from "../../base/FormInput";
import {useCreateDiagramMutation, useCreateProjectMutation} from "../../../api";
import {useNavigate} from "react-router-dom";

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
    const navigate = useNavigate()

    const [createProject, {data: resCreateProject}] = useCreateProjectMutation()
    const [createDiagram, {data: resCreateDiagram}] = useCreateDiagramMutation()
    const form = useForm<IValidationSchema>({
        resolver: zodResolver(validationSchema),
    });

    const onSubmit = (data: IValidationSchema) => {
        createProject({
            name: data.projectName,
        });
    }

    useEffect(() => {
        if (resCreateDiagram) {
            onSuccess()
            navigate(`/diagram/${resCreateDiagram.id}`)
        }
    }, [resCreateDiagram])

    useEffect(() => {
        if (resCreateProject && resCreateProject.id) {
            createDiagram({
                diagramName: 'default',
                projectId: resCreateProject.id,
            })
        }
    }, [resCreateProject])

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
