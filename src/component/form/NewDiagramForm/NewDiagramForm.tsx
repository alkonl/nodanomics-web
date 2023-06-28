import React, {useState} from 'react';
import {z} from "zod";
import {validation} from "../../../utils";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormText, FormTextArea} from "../../base/FormInput";
import {Box, Button, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/AddBoxTwoTone';
import {TagsPopUp} from "../../popUp/TagsPopUp";
import {TagListSmall} from "../../list";


enum EFormFields {
    diagramName = 'diagramName',
    diagramDescription = 'diagramDescription',
    diagramTags = 'diagramTags',
}

const validationSchema = z.object({
    [EFormFields.diagramName]: validation.diagramName,
    [EFormFields.diagramDescription]: validation.diagramDescription,
    [EFormFields.diagramTags]: validation.diagramTags,
})

type IValidationSchema = z.infer<typeof validationSchema>;

export const NewDiagramForm = () => {

    const [isTagsPopUpShow, setTagsPopUpShow] = useState(false)

    const form = useForm<IValidationSchema>({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            [EFormFields.diagramTags]: []
        }
    });

    const onSubmit = async (data: IValidationSchema) => {
        console.log(data)
    }

    const closeTagsPopUp = () => {
        setTagsPopUpShow(false)
    }

    return (
        <Box
            style={{
                width: '400px'

            }}
        >
            <form onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit(onSubmit)();
            }}>
                <FormText label={'Name'} name={EFormFields.diagramName} form={form}/>
                <FormTextArea label={'Description'} name={EFormFields.diagramDescription} form={form}/>
                <Box>
                    <Box sx={{
                        display: "flex"
                    }}>

                        <TagsPopUp
                            isShow={isTagsPopUpShow}
                            onClose={closeTagsPopUp}
                            tagsForm={{
                                form: form,
                                name: EFormFields.diagramTags,
                                onSave: closeTagsPopUp,
                                allTags: [],
                            }}
                        />


                        <Button onClick={() => {
                            setTagsPopUpShow(true)
                        }}>
                            <Typography>
                                Tags:
                            </Typography>
                            <AddIcon color='info'/>
                        </Button>
                    </Box>
                    <TagListSmall selectedTags={form.getValues()[EFormFields.diagramTags]}/>
                </Box>
                <Button variant="contained" type='submit'>
                    Save
                </Button>
            </form>
        </Box>
    );
};
