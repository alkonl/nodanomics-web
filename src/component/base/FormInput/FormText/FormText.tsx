import React, {useMemo} from 'react';
import {FormBaseInput, IBaseInputProps, IFormBaseInputProps, IFormLabelNode} from "../FormBaseInput";

const InputFormText: React.FC<IBaseInputProps> = ({value, ...props}) => {
    return (
        <input value={value ? value : ''} {...props}/>
    );
}

const LabelFormText: React.FC<{ text: string }> = ({text}) => {
    return (
        <div>{text}</div>
    )
}

type IFormTextProps = IFormBaseInputProps & IBaseInputProps & {
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
        <FormBaseInput {...props}
                       Label={Label}
                       Input={(baseProps) => {
                           const {value, onChange} = baseProps
                           return <InputFormText onChange={onChange} value={value} {...props} />
                       }}/>
    );
};

