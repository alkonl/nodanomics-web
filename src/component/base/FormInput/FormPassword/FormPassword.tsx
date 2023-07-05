import React, {useMemo, useState} from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {FormBaseInput, IBaseInputProps, IFormBaseInputProps, IFormLabelNode} from "../FormBaseInput";
import {Box, IconButton, InputAdornment, TextField} from "@mui/material";
import {BaseLabel} from "../../Label";

const InputFormText: React.FC<IBaseInputProps> = ({value, ...props}) => {
    const [inputType, setInputType] = useState<'password' | 'text'>('password');
    const [EyeIcon, setEyeIcon] = useState<React.FC>(VisibilityOffIcon);
    const changeInputType = () => {
        setInputType(inputType === 'password' ? 'text' : 'password')
        setEyeIcon(() => inputType === 'password' ? VisibilityIcon : VisibilityOffIcon)
    }
    return (
        <Box>
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
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={changeInputType}><EyeIcon/></IconButton>
                        </InputAdornment>
                    )
                }}
                {...props} value={value ? value : ''} type={inputType}
            />
        </Box>
    );
}



// const LabelFormText: React.FC<{ text?: string }> = ({text}) => {
//     return (
//         <Typography sx={{
//             fontSize: '12px',
//             fontWeight: 'bold',
//             marginBottom: '4px'
//         }}>{text}</Typography>
//     )
// }

const LabelChange: React.FC<{ onChangePassword?: () => void; }> = ({onChangePassword}) => {

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between'
        }}>
            <BaseLabel  text="Password" />
            <BaseLabel
                text="Change Password"
                onClick={onChangePassword}
                sx={{
                    fontSize: '12px',
                    fontWeight: 'bold',
                    marginBottom: '4px',
                    color: 'blue',
                    cursor: 'pointer'
                }}
            />
        </Box>
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
                    Node: <BaseLabel text={label.text}/>
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
