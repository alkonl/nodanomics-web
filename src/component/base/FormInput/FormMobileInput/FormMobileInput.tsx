import React, {useMemo} from 'react';
import {FormBaseInput, IFormBaseInputProps, IFormLabelNode} from "../FormBaseInput";
import {BaseLabel} from "../../Label";
import {IMobilePhoneInputOnChange, MobilePhoneInput} from "../../Input";


type IFormTextProps = IFormBaseInputProps & {
    label?: string;
}
export const FormMobileInput: React.FC<IFormTextProps> = ({label, ...props}) => {
    const Label: IFormLabelNode | undefined = useMemo(() => {
        if (label) {
            return {
                type: 'NODE',
                Node: <BaseLabel text={label}/>
            }
        }
        return undefined
    }, [label])

    return (

        <FormBaseInput {...props}
                       Label={Label}
                       Input={(baseProps) => {
                           const {value, onChange} = baseProps
                           return <MobilePhoneInput onChange={onChange as unknown as IMobilePhoneInputOnChange} value={value as string} {...props} />
                       }}/>
    );
};
