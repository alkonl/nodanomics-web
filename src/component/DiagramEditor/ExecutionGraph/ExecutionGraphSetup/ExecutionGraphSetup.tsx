import React, {useEffect} from 'react';
import {z} from "zod";
import {Box, Typography} from "@mui/material";
import {useAssignNodeToExecutionGraph, useClearHistory, useSetupExecutionGraph} from "../../../../hooks";
import {ColorPickerForm} from "../../../ColorPicker";
import {useDiagramEditorState} from "../../../../redux";
import {ParameterExecutionGraphSetup} from "./styledComponent";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {MButton} from "../../../base";


enum EFormFields {
    gridColor = 'gridColor',
    xAxisTitle = 'xAxisTitle',
    isShowVerticalLine = 'isShowVerticalLine',
    assignedDataComponent = 'assignedDataComponent',
}

const validationSchema = z.object({
    [EFormFields.gridColor]: z.string(),
    [EFormFields.xAxisTitle]: z.string(),
    [EFormFields.isShowVerticalLine]: z.boolean(),
    [EFormFields.assignedDataComponent]: z.object({
        label: z.string(),
        id: z.string(),
    }),
})

type IValidationSchema = z.infer<typeof validationSchema>;

export const ExecutionGraphSetup = () => {

    const {updateExecutionGridProperties} = useSetupExecutionGraph();
    const {options} = useDiagramEditorState()?.executionGrid || {}


    const form = useForm<IValidationSchema>({
        resolver: zodResolver(validationSchema),
    });

    const {dataTags, changeAssignNode, currentAssignedNode} = useAssignNodeToExecutionGraph();


    useEffect(() => {
        form.reset({
            [EFormFields.gridColor]: options?.grid?.borderColor,
            [EFormFields.xAxisTitle]: options?.xaxis?.title?.text,
            [EFormFields.isShowVerticalLine]: options?.grid?.xaxis?.lines?.show,
            [EFormFields.assignedDataComponent]: currentAssignedNode ? {
                label: currentAssignedNode.label,
                id: currentAssignedNode.id,
            } : undefined,
        })
    }, [options]);


    const onSubmit = (data: IValidationSchema) => {
        updateExecutionGridProperties({
            gridColor: data.gridColor,
            xAxisTitle: data.xAxisTitle,
            isShowVerticalGridLines: data.isShowVerticalLine,
        });
        changeAssignNode(data.assignedDataComponent.id)
    }

    const clearHistory = useClearHistory()


    // const dataTags = useDiagramEditorState().diagramNodes
    //     .filter((node) => node.data.type === EDiagramNode.Data && node.data.tag)
    //     .map((node) => (node.data.tag)) as string[]

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
        }}
             onSubmit={(e) => {
                 e.preventDefault();
                 form.handleSubmit(onSubmit)();
             }}
             component="form"
        >
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
                <ParameterExecutionGraphSetup.Element label="On vertical lines">
                    <ParameterExecutionGraphSetup.Checkbox
                        name={EFormFields.isShowVerticalLine}
                        form={form}
                    />
                </ParameterExecutionGraphSetup.Element>
                <ParameterExecutionGraphSetup.Element label="assign node">
                    <ParameterExecutionGraphSetup.Autocomplete
                        name={EFormFields.assignedDataComponent}
                        form={form}
                        options={dataTags}
                    />
                </ParameterExecutionGraphSetup.Element>
                <ParameterExecutionGraphSetup.Element label="">
                    <MButton.Submit type="submit">
                        Save
                    </MButton.Submit>
                </ParameterExecutionGraphSetup.Element>

                <ParameterExecutionGraphSetup.Element label="clear statistic">
                    <MButton.Submit onClick={clearHistory}>
                        clear
                    </MButton.Submit>
                </ParameterExecutionGraphSetup.Element>
            </ParameterExecutionGraphSetup.Container>
        </Box>
    );
};
