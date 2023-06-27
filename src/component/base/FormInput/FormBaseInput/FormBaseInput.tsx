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

export interface IFormInputProps extends IFormBaseInputProps {
    Input: React.FC<Pick<IBaseInputProps, 'value' | 'onChange'>>;
    Label?: IFormLabelNode;
}

export const FormBaseInput: React.FC<IFormInputProps> = (
    {
        name,
        form,
        Input,
        Label,
    }
) => {
    return (
        <Controller
            render={({
                         field: {onChange, value},
                         fieldState: {error},
                     }) => (
                <Box>
                    {Label && <Box>
                        {Label.Node}
                    </Box>}
                        <Input value={value} onChange={onChange}/>
                    {error && <Box className={styles.errorText}>{error.message}</Box>}
                </Box>
            )}
            control={form.control}
            name={name}/>
    );
};
