import React, {HTMLInputTypeAttribute, InputHTMLAttributes} from 'react';
import {FormInput, IFormBaseInputProps} from "../FormInput";

const InputFormText: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
    placeholder,
    onChange,
    value
                                                                              }) => {
    return (
        <input placeholder={placeholder} onChange={onChange} value={value ? value : ''} type="text"/>
    );
}

interface IFormTextProps extends IFormBaseInputProps {
    type?: HTMLInputTypeAttribute;
}

export const FormText: React.FC<IFormTextProps> = (props) => {
    return (
        <FormInput {...props} Input={(baseProps) => {
            return <InputFormText {...baseProps}/>
        }}/>
    );
};

