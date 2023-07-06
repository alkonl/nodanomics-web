import React from 'react';
import {AccountInnerLayout, BillingAddressAccordion, PaymentMethodAccording} from "../../component";

export const AccountBillingPage = () => {
    return (
        <AccountInnerLayout>
            <BillingAddressAccordion/>
            <PaymentMethodAccording/>
        </AccountInnerLayout>
    );
};;
