import React, {HTMLInputTypeAttribute, InputHTMLAttributes} from 'react';
import {FormInput, IFormBaseInputProps} from "../FormInput";

const InputFormText: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({value,...props}) => {
    return (
        <input value={value ? value : ''} {...props}/>
    );
}

interface IFormTextProps extends IFormBaseInputProps {
    type?: HTMLInputTypeAttribute;
}

export const FormText: React.FC<IFormTextProps> = (props) => {
    return (
        <FormInput {...props} Input={(baseProps) => {
            return <InputFormText name={props.name} type={props.type} {...baseProps}/>
        }}/>
    );
};

