import React from 'react';
import PhoneInput, {CountryData} from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export type IMobilePhoneInputOnChange = (value: string, data: any | CountryData, event: React.ChangeEvent<HTMLInputElement>, formattedValue: string) => void;


export const MobilePhoneInput: React.FC<{
    value?: string;
    onChange?: IMobilePhoneInputOnChange
}> = ({
          value = '',
          onChange,
      }) => {
    return (
        <PhoneInput
            value={value}
            onChange={onChange}
        />
    );
};
