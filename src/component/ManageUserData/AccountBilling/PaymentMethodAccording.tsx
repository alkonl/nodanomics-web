import React, {useState} from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {EditBillingInformationForm, FormAddNewCard} from "../../form";
import {MButton} from "../../base";

export const PaymentMethodAccording = () => {
    const [isPaymentAccordionShow, setIsPaymentAccordionShow] = useState(true)
    const [isPaymentEdit, setPaymentEdit] = useState(false)

    const onPaymentAddress = () => {
        setPaymentEdit(true)
    }

    return (
        <Accordion
            expanded={isPaymentAccordionShow}
            onChange={() => {
                setIsPaymentAccordionShow(!isPaymentAccordionShow)
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
                {isPaymentEdit ? <FormAddNewCard/> : <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        maxWidth: '500px',
                        gap: 2,
                    }}
                >

                    <Typography sx={{
                        marginLeft: 6,
                    }}>
                        All payments are processed with the VISA/MASTERCARD card ending in 5555
                    </Typography>
                    <Box sx={{
                        marginLeft: 4,
                        display: 'flex',
                        columnGap: 1,
                    }}>
                        <Typography sx={{
                            fontWeight: 'bold',
                        }}>
                            Card Holder Name:
                        </Typography>
                         <Typography >
                             JHON DOE
                         </Typography>
                    </Box>
                    <MButton.Submit
                        sx={{
                            alignSelf: 'flex-end',
                        }}
                        onClick={onPaymentAddress}

                    >
                        Edit Payment Method
                    </MButton.Submit>
                </Box>}
            </AccordionDetails>
        </Accordion>
    );
};
