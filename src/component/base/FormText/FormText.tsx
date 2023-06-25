import React, {HTMLInputTypeAttribute, InputHTMLAttributes, useMemo} from 'react';
import {FormInput, IFormBaseInputProps, IFormLabelNode} from "../FormInput";

const InputFormText: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({value, ...props}) => {
    return (
        <input value={value ? value : ''} {...props}/>
    );
}

const LabelFormText: React.FC<{ text: string }> = ({text}) => {
    return (
        <div>{text}</div>
    )
}

interface IFormTextProps extends IFormBaseInputProps {
    type?: HTMLInputTypeAttribute;
    label?: string;
}

export const FormText: React.FC<IFormTextProps> = (props) => {

    const Label: IFormLabelNode | undefined = useMemo(() => {
        const text = props.label
        if (text) {
            return {
                type: 'NODE',
                Node: <LabelFormText text={text}/>
            }
        }
        return undefined
    }, [props.label])

    return (
        <FormInput {...props}
                   Label={Label}
                   Input={(baseProps) => {
                       return <InputFormText name={props.name} type={props.type} {...baseProps}/>
                   }}/>
    );
};

