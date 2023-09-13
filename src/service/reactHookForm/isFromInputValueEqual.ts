import {IFormBaseInputProps} from "../../component/base/FormInput";
import lodash from "lodash";

export const isFromInputValueEqual = (prevProps: IFormBaseInputProps, nextProps: IFormBaseInputProps) => {
    const prevValues = prevProps.form.getValues(prevProps.name);
    const nextValues = nextProps.form.getValues(nextProps.name);
    return lodash.isEqual(prevValues, nextValues);
}
