import React, {useState} from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {EColor} from "../../../constant";
import {EditBillingInformationForm} from "../../form";
import {MButton} from "../../base";

const MOCK_BILLING_ADDRESS: {
    name: string,
    value: string
}[] = [{
    name: 'Name',
    value: 'Jhon Doe'
}, {
    name: 'Address',
    value: 'Okta'
}, {
    name: 'City',
    value: 'Okta'
}, {
    name: 'Postal Code',
    value: '000000'
}, {
    name: 'Country',
    value: '000000'
}]

export const BillingAddressAccordion = () => {

    const [isBillingAccordionShow, setBillingAccordionShow] = useState(true)
    const [isBillingAddressEdit, setBillingAddressEdit] = useState(false)

    const onEditBillingAddress = () => {
        setBillingAddressEdit(true)
    }
    return (
        <Accordion
            expanded={isBillingAccordionShow}
            onChange={() => {
                setBillingAccordionShow(!isBillingAccordionShow)
            }}
            sx={{
                boxShadow: 'none',
            }}
        >
            <AccordionSummary
                sx={{
                    width: 'fit-content',
                    border: 'none'
                }}
                expandIcon={<ExpandMoreIcon/>}
            >
                <Typography>
                    Billing Address
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                {isBillingAddressEdit ? <EditBillingInformationForm/> : <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        maxWidth: '500px',
                    }}
                >
                    <Grid container columns={3} columnGap={1} sx={{
                        width: 'fit-content'
                    }}>
                        {MOCK_BILLING_ADDRESS.map((item) => (
                            <>
                                <Grid item xs={1}>
                                    <Typography sx={{
                                        textAlign: 'right',
                                        fontWeight: 'bold',
                                    }}>
                                        {item.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography>
                                        {item.value}
                                    </Typography>
                                </Grid>
                            </>
                        ))}
                    </Grid>
                    <MButton.Submit
                        sx={{
                            alignSelf: 'flex-end',
                        }}
                        onClick={onEditBillingAddress}

                    >
                        Edit Billing Information
                    </MButton.Submit>
                </Box>}
            </AccordionDetails>
        </Accordion>
    );
};
