import React, {useEffect} from 'react';
import {Box, Button, Typography} from "@mui/material";
import {z} from "zod";
import {validation} from "../../../utils";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import styles from './EditBillingInformationForm.module.scss'
import {Text} from "../../base/Text";
import {FormText} from "../../base/FormInput";
import {MButton} from "../../base";

enum EFormFields {
    firstName = 'firstName',
    lastName = 'lastName',
    billingAddress = 'billingAddress',
    city = 'city',
    postalCode = 'postalCode',
    country = 'country',
}

const validationSchema = z.object({
    [EFormFields.firstName]: validation.firstName,
    [EFormFields.lastName]: validation.lastName,
    [EFormFields.billingAddress]: validation.billingAddress,
    [EFormFields.city]: validation.city,
    [EFormFields.postalCode]: validation.postalCode,
    [EFormFields.country]: validation.country,
})

type IValidationSchema = z.infer<typeof validationSchema>;


export const EditBillingInformationForm = () => {

    const form = useForm<IValidationSchema>({
        resolver: zodResolver(validationSchema),
    });

    useEffect(() => {
        form.reset({
            [EFormFields.firstName]: 'John',
            [EFormFields.lastName]: 'Doe',
            [EFormFields.billingAddress]: '123 Main St',
            [EFormFields.city]: 'New York',
            [EFormFields.postalCode]: '12345',
            [EFormFields.country]: 'USA',
        })
    }, [])


    return (
        <Box
            component="form"
        >
            <Typography sx={{
                fontSize: '18px',
                fontWeight: 'bold',
            }}>
                Edit Billing Information
            </Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2
            }}>
                <Box className={styles.parent}>
                    <Box className={styles.labelFirstName}>
                        <Text.Label>
                            First Name
                        </Text.Label>
                    </Box>
                    <Box className={styles.firstNameInput}>
                        <FormText name={EFormFields.firstName} form={form}/>
                    </Box>
                    <Box className={styles.lastNameLabel}>
                        <Text.Label>
                            Last Name
                        </Text.Label>
                    </Box>
                    <Box className={styles.lastNameInput}>
                        <FormText name={EFormFields.lastName} form={form}/>
                    </Box>
                    <Box className={styles.billingAddressLabel}>
                        <Text.Label>
                            Billing Address
                        </Text.Label>
                    </Box>
                    <Box className={styles.billingAddressInput1}>
                        <FormText name={EFormFields.billingAddress} form={form}/>
                    </Box>
                    <Box className={styles.billingAddressInput2}>
                        <FormText name={EFormFields.billingAddress} form={form}/>
                    </Box>
                    <Box className={styles.cityLabel}>
                        <Text.Label>
                            City
                        </Text.Label>
                    </Box>
                    <Box className={styles.cityInput}>
                        <FormText name={EFormFields.city} form={form}/>
                    </Box>
                    <Box className={styles.postalCodeLabel}>
                        <Text.Label>
                            Postal Code
                        </Text.Label>
                    </Box>
                    <Box className={styles.postalCodeInput}>
                        <FormText name={EFormFields.postalCode} form={form}/>
                    </Box>
                    <Box className={styles.countryLabel}>
                        <Text.Label>
                            Country
                        </Text.Label>
                    </Box>
                    <Box className={styles.countryInput}>
                        <FormText name={EFormFields.country} form={form}/>
                    </Box>
                </Box>
                <MButton.Submit
                    sx={{
                        alignSelf: 'flex-end',
                        py: 1,
                        px: 6,
                    }}
                >
                    Save
                </MButton.Submit>
            </Box>
        </Box>
    );
};
