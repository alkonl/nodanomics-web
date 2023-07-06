import React from 'react';
import {Controller, UseFormReturn} from "react-hook-form";
import styles from './FormInput.module.scss';
import {Box} from "@mui/material";
import {IBaseInputProps} from "../../Input";



export type IBaseFormInput = Pick<IBaseInputProps, 'value' | 'onChange'>

export interface IFormBaseInputProps {
    name: string;
    form: UseFormReturn<any>;
}

export interface IFormLabelNode {
    type: 'NODE'
    Node: React.ReactNode
}

export type IFormLabel = IFormLabelNode

export interface IFormInputProps extends IFormBaseInputProps {
    Input: React.FC<IBaseFormInput>;
    Label?: IFormLabel;
    inputProps?: IBaseInputProps;
}

export const FormBaseInput: React.FC<IFormInputProps> = (
    {
        name,
        form,
        Input,
        Label,
        inputProps,
    }
) => {
    return (
        <Controller
            render={({
                         field: {onChange, value},
                         fieldState: {error},
                     }) => {
                return (
                    <Box
                        style={{
                            width: '100%'
                        }}
                    >
                        {Label && <Box>
                            {Label.Node}
                        </Box>}
                        <Input onChange={onChange}  value={value} {...inputProps}/>
                        {error && <Box className={styles.errorText}>{error.message}</Box>}
                    </Box>
                )
            }}
            control={form.control}
            name={name}/>
    );
};
