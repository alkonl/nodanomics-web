import React, {useEffect} from 'react';
import {z} from "zod";
import {Box, Typography} from "@mui/material";
import {useSetupExecutionGraph} from "../../../../hooks";
import {ColorPickerForm} from "../../../ColorPicker";
import {useDiagramEditorState} from "../../../../redux";
import {ParameterExecutionGraphSetup} from "./styledComponent";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";


enum EFormFields {
    gridColor = 'gridColor',
    xAxisTitle = 'xAxisTitle',
}

const validationSchema = z.object({
    [EFormFields.gridColor]: z.string(),
    [EFormFields.xAxisTitle]: z.string(),
})

type IValidationSchema = z.infer<typeof validationSchema>;

export const ExecutionGraphSetup = () => {

    const {changeGridColor} = useSetupExecutionGraph();
    const {properties} = useDiagramEditorState()?.executionGrid || {}


    const form = useForm<IValidationSchema>({
        resolver: zodResolver(validationSchema),
    });

    useEffect(() => {
        form.reset({
            [EFormFields.gridColor]: properties?.gridColor,
        })
    }, [properties]);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
        }}>
            <Box>
                <Typography sx={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                }}>
                    Grid setup
                </Typography>
            </Box>
            <ParameterExecutionGraphSetup.Container>
                <ParameterExecutionGraphSetup.Element label="Grid color">
                    <ColorPickerForm
                        name={EFormFields.gridColor}
                        form={form}
                    />
                </ParameterExecutionGraphSetup.Element>
                <ParameterExecutionGraphSetup.Element label="X axis title">
                    <ParameterExecutionGraphSetup.Input
                        name={EFormFields.xAxisTitle}
                        form={form}
                    />
                </ParameterExecutionGraphSetup.Element>
            </ParameterExecutionGraphSetup.Container>
        </Box>
    );
};
