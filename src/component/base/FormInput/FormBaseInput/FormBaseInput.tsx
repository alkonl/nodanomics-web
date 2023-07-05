import React from 'react';
import {Controller, UseFormReturn} from "react-hook-form";
import styles from './FormInput.module.scss';
import {Box} from "@mui/material";

export type  IBaseInputProps = Pick<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'type' |
    'placeholder' |
    'value' |
    'onChange' |
    'disabled' |
    'checked' |
    'className' |
    'id' |
    'name' |
    'autoFocus'
>


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
    Input: React.FC<Pick<IBaseInputProps, 'value' | 'onChange'>>;
    Label?: IFormLabel;
    inputProps?: IBaseInputProps;
}

export const FormBaseInput: React.FC<IFormInputProps> = (
    {
        name,
        form,
        Input,
        Label,
        inputProps
    }
) => {
    return (
        <Controller
            render={({
                         field: {onChange, value},
                         fieldState: {error},
                     }) => (
                <Box
                style={{
                    width: '100%'
                }}
                >
                    {Label && <Box>
                        {Label.Node}
                    </Box>}
                        <Input value={value} onChange={onChange} {...inputProps}/>
                    {error && <Box className={styles.errorText}>{error.message}</Box>}
                </Box>
            )}
            control={form.control}
            name={name}/>
    );
};
