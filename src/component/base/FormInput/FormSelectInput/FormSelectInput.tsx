import React, {useMemo} from 'react';
import {FormBaseInput, IFormBaseInputProps, IFormLabelNode} from "../FormBaseInput";
import {BaseLabel} from "../../Label";
import {SelectInput, SelectInputList, SelectInputOnChange} from "../../Input";


type IFormTextProps = IFormBaseInputProps & {
    label?: string;
    items: SelectInputList
}
export const FormSelectInput: React.FC<IFormTextProps> = ({label, ...props}) => {
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
                           return <SelectInput
                               list={props.items}
                               onChange={onChange as unknown as SelectInputOnChange}
                                               value={value as string} {...props} />
                       }}/>
    );
};
