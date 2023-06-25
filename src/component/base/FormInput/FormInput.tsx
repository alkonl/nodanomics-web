import React, {ChangeEvent} from 'react';
import {Controller, UseFormReturn} from "react-hook-form";
import styles from './FormInput.module.scss';

export interface IBaseFromInputProps {
    placeholder?: string;
    onChange?: (event: ChangeEvent) => void;
    value?: string;
}

export interface IFormBaseInputProps {
    name: string;
    form: UseFormReturn<any>;
    placeholder?: string;
}

export interface IFormLabelNode {
    type: 'NODE'
    Node: React.ReactNode
}

export interface IFormInputProps extends IFormBaseInputProps {
    Input: React.FC<IBaseFromInputProps>;
    Label?: IFormLabelNode;
}

export const FormInput: React.FC<IFormInputProps> = (
    {
        name,
        form,
        placeholder,
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
                    <Input placeholder={placeholder} value={value} onChange={onChange}/>
                    {/*<input placeholder={placeholder} onChange={onChange} value={value ? value : ''} type="text"/>*/}
                    {error && <div className={styles.errorText}>{error.message}</div>}
                </div>
            )}
            control={form.control}
            name={name}/>
    );
};
