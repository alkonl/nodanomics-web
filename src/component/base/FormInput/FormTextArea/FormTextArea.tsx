import React, {useMemo} from 'react';
import {FormBaseInput, IBaseInputProps, IFormBaseInputProps, IFormLabelNode} from "../FormBaseInput";
import {TextField} from "@mui/material";

const InputFormText: React.FC<IBaseInputProps> = ({value, ...props}) => {
    return (
        <TextField
            multiline
            rows={2}
            maxRows={5}
            value={value ? value : ''}
            {...props}/>
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
export const FormTextArea: React.FC<IFormTextProps> = ({label,...props}) => {
    const Label: IFormLabelNode | undefined = useMemo(() => {
        if (label) {
            return {
                type: 'NODE',
                Node: <LabelFormText text={label}/>
            }
        }
        return undefined
    }, [label])

    return (
        <FormBaseInput {...props}
                       Label={Label}
                       Input={(baseProps) => {
                           const {value, onChange} = baseProps
                           return <InputFormText onChange={onChange} value={value} {...props} />
                       }}/>
    );
};

