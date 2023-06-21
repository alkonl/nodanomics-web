import React from 'react';
import {FormInput, IBaseFromInputProps, IFormBaseInputProps} from "../FormInput";

const InputFormText: React.FC<IBaseFromInputProps> = ({placeholder, onChange, value}) => {
    return (
        <input placeholder={placeholder} onChange={onChange} value={value ? value : ''} type="text"/>
    );
}

export const FormText: React.FC<IFormBaseInputProps> = (props) => {
    return (
        <FormInput {...props} Input={InputFormText}/>
    );
};

