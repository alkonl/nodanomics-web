import React, {useMemo} from 'react';
import {FormBaseInput, IFormBaseInputProps, IFormLabelNode} from "../FormBaseInput";
import {TextField} from "@mui/material";
import {IBaseInputProps} from "../../Input";

const InputFormText: React.FC<IBaseInputProps> = ({value, ...props}) => {
    return (
        <TextField
            style={{width: '100%'}}
            multiline
            minRows={3}
            maxRows={7}
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

