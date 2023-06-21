import React, {useState} from 'react';
import {FormInput, IBaseFromInputProps, IFormBaseInputProps} from "../FormInput";

const InputFormText: React.FC<IBaseFromInputProps> = ({placeholder, onChange, value}) => {
    const [inputType, setInputType] = useState<'password' | 'text'>('password');
    const [buttonText, setButtonText] = useState<'Show password' | 'Hide password'>('Show password');
    const changeInputType = () => {
        setInputType(inputType === 'password' ? 'text' : 'password')
        setButtonText(buttonText === 'Show password' ? 'Hide password' : 'Show password')
    }
    return (
        <div>
            <input placeholder={placeholder} onChange={onChange} value={value ? value : ''} type={inputType}/>
            <button onClick={changeInputType}>{buttonText}</button>
        </div>
    );
}
export const FormPassword: React.FC<IFormBaseInputProps> = (props) => {
    return (
        <FormInput {...props} Input={InputFormText}/>
    );
};