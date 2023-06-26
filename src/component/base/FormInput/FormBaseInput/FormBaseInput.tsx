import React from 'react';
import {Controller, UseFormReturn} from "react-hook-form";
import styles from './FormInput.module.scss';

export type  IBaseInputProps = Pick<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
'type'|
'placeholder'|
'value'|
'onChange'|
'disabled'|
'checked'|
'className'|
'id'|
'name'|
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
                <div>
                    {Label && <div>
                        {Label.Node}
                    </div>}
                    <Input value={value} onChange={onChange}/>
                    {error && <div className={styles.errorText}>{error.message}</div>}
                </div>
            )}
            control={form.control}
            name={name}/>
    );
};
