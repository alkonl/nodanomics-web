import React, {useMemo} from 'react';
import {FormBaseInput, IBaseInputProps, IFormBaseInputProps, IFormLabelNode} from "../FormBaseInput";
import {TextField, Typography} from "@mui/material";
import {EFontColor} from "../../../../constant";


const InputFormText: React.FC<IBaseInputProps> = ({value, ...props}) => {

    return (
        <TextField
            sx={{
                width: '100%',
                height: 'fit-content',
            }}
            variant="outlined"
            inputProps={{
                sx: {
                    color: EFontColor.black,
                    padding: '6px',
                    border: 1,
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
                       Input={InputFormText}
                       inputProps={props}
        />
    );
};

