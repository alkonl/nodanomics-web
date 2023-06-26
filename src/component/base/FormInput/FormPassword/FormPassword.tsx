import React, {useMemo, useState} from 'react';
import {FormBaseInput, IBaseInputProps, IFormBaseInputProps, IFormLabelNode} from "../FormBaseInput";

const InputFormText: React.FC<IBaseInputProps> = ({value, ...props}) => {
    const [inputType, setInputType] = useState<'password' | 'text'>('password');
    const [buttonText, setButtonText] = useState<'Show password' | 'Hide password'>('Show password');
    const changeInputType = () => {
        setInputType(inputType === 'password' ? 'text' : 'password')
        setButtonText(buttonText === 'Show password' ? 'Hide password' : 'Show password')
    }
    return (
        <div>
            <input {...props} value={value ? value : ''} type={inputType}/>
            <button onClick={changeInputType}>{buttonText}</button>
        </div>
    );
}

const LabelChange: React.FC<{ onChangePassword?: () => void; }> = ({onChangePassword}) => {

    return (
        <button onClick={onChangePassword} style={{color: 'blue'}}>Change password</button>
    )
}

interface LabelChangePasswordProps {
    labelType?: 'CHANGE_PASSWORD';
    onChangePassword?: () => void;
}

interface LabelTextProps {
    labelType?: 'TEXT';
    text?: string;
}

type LabelTypes = LabelChangePasswordProps | LabelTextProps
type IFormPasswordProps = IFormBaseInputProps & Omit<IBaseInputProps, 'type'> & { label?: LabelTypes }
export const FormPassword: React.FC<IFormPasswordProps> = ({label, ...props}) => {
    const Label: IFormLabelNode | undefined = useMemo(() => {
        if (label) {
            if (label.labelType === 'CHANGE_PASSWORD') {
                return {
                    type: 'NODE',
                    Node: <LabelChange onChangePassword={label.onChangePassword}/>
                }
            } else if (label.labelType === 'TEXT') {
                return {
                    type: 'NODE',
                    Node: <div>{label.text}</div>
                }
            }
        }
        return undefined
    }, [label?.labelType])
    return (
        <FormBaseInput {...props} Label={Label} Input={({onChange, value}) => {
            return <InputFormText onChange={onChange} value={value} {...props}/>
        }}/>
    );
};
