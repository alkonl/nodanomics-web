import React, {useMemo} from 'react';
import {FormBaseInput, IBaseInputProps, IFormBaseInputProps, IFormLabelNode} from "../FormBaseInput";
import {Input, OutlinedInput, TextField, Typography} from "@mui/material";

const InputFormText: React.FC<IBaseInputProps> = ({value, ...props}) => {
    return (
        <TextField
            style={{
                width: '100%'
            }}
            variant="outlined"
            inputProps={{
                style: {
                    padding: 8
                }
            }}
            value={value ? value : ''} {...props}/>
    );
}

const LabelFormText: React.FC<{ text: string }> = ({text}) => {
    return (
        <Typography style={{
            fontSize: '12px',
            fontWeight: 'bold',
            marginBottom: '4px'
        }}>{text}</Typography>
    )
}

type IFormTextProps = IFormBaseInputProps & IBaseInputProps & {
    label?: string;
}
export const FormText: React.FC<IFormTextProps> = ({label, ...props}) => {
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

