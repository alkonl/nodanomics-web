import React, {useMemo, useState} from 'react';
import {FormBaseInput, IBaseInputProps, IFormBaseInputProps, IFormLabelNode} from "../FormBaseInput";

const InputFormText: React.FC<IBaseInputProps> = ({ value, ...props}) => {
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

const LabelChange: React.FC<{onChangePassword?: () => void;}> = ({onChangePassword}) => {

    return (
        <button onClick={onChangePassword} style={{color: 'blue'}}>Change password</button>
    )
}
interface LabelChangePasswordProps {
    labelType?: 'CHANGE_PASSWORD';
    onChangePassword?: () => void;
}

type LabelTypes = LabelChangePasswordProps
type IFormPasswordProps = IFormBaseInputProps & LabelTypes & Omit<IBaseInputProps, 'type'>
export const FormPassword: React.FC<IFormPasswordProps> = (props) => {
    const Label: IFormLabelNode | undefined = useMemo(() => {

        if (props.labelType === 'CHANGE_PASSWORD') {
            return {
                type: 'NODE',
                Node: <LabelChange onChangePassword={props.onChangePassword} />
            }
        }
        return undefined
    }, [props.labelType])
    return (
        <FormBaseInput {...props} Label={Label} Input={({onChange, value})=>{
            return <InputFormText onChange={onChange} value={value} {...props}/>
        }}/>
    );
};
