import React from 'react';
import {Box} from "@mui/material";
import {BillingAddressAccordion} from "./BillingAddressAccordion";
import {PaymentMethodAccording} from "./PaymentMethodAccording";

export const AccountBilling = () => {


    return (
        <Box>
            <BillingAddressAccordion/>
            <PaymentMethodAccording/>
        </Box>
    );
};
