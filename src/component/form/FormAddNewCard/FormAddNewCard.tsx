import React, {useEffect} from 'react';
import {validation} from "../../../utils";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Box, Typography} from "@mui/material";
import {Text} from "../../base/Text";
import {FormCvvInput, FormText} from "../../base/FormInput";
import {MButton} from "../../base";
import {FormExpireDateInput} from "../../base/FormInput/FormExpireDateInput";
import {FormCardNumberInput} from "../../base/FormInput/FormCardNumberInput";
import {BankCard} from "../../Card";

enum EFormFields {
    cardNumber = 'cardNumber',
    cardHolderName = 'cardHolderName',
    expirationDate = 'expirationDate',
    cvv = 'cvv',
}

const validationSchema = z.object({
    [EFormFields.cardNumber]: validation.cardNumber,
    [EFormFields.cardHolderName]: validation.cardHolderName,
    [EFormFields.expirationDate]: validation.expirationDate,
    [EFormFields.cvv]: validation.cvv,
})
type IValidationSchema = z.infer<typeof validationSchema>;

export const FormAddNewCard = () => {

    const form = useForm<IValidationSchema>({
        resolver: zodResolver(validationSchema),
    });
    const formValues = form.watch()

    useEffect(() => {
        form.reset({
            [EFormFields.cardNumber]: '4024007154656739',
            [EFormFields.cardHolderName]: 'John Doe',
            [EFormFields.expirationDate]: '12/22',
            [EFormFields.cvv]: '123',
        })
    }, [])

    const onSubmit = (data: IValidationSchema) => {
        console.log(data)
    }
    return (
        <Box sx={{
            py: 4,
            px: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: 400,
        }}
             onSubmit={(e) => {
                 e.preventDefault()
                 form.handleSubmit(onSubmit)();
             }}
             component="form"
        >
            <Typography sx={{
                fontWeight: 'bold',
                alignSelf: 'flex-start'
            }}>
                Add New Card
            </Typography>
            <BankCard
                cardNumber={formValues[EFormFields.cardNumber]}
                cardHolderName={formValues[EFormFields.cardHolderName]}
                expireDate={formValues[EFormFields.expirationDate]}
            />
            <Box
                sx={{
                    marginTop: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    flex: 1,
                    width: '100%',
                }}
            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                }}>
                    <Box>
                        <Text.Label>
                            Card Number
                        </Text.Label>
                        <Box sx={{
                            px: 2,
                        }}>
                            <FormCardNumberInput name={EFormFields.cardNumber} form={form}/>
                        </Box>
                    </Box>
                    <Box>
                        <Text.Label>
                            Card Holder Number
                        </Text.Label>
                        <Box sx={{
                            px: 2,
                        }}>
                            <FormText name={EFormFields.cardHolderName} form={form}/>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Box>
                            <Text.Label>
                                Expire Date
                            </Text.Label>
                            <Box sx={{
                                px: 2,
                            }}>
                                <FormExpireDateInput name={EFormFields.expirationDate} form={form}/>
                            </Box>
                        </Box>
                        <Box>
                            <Text.Label>
                                Security Code (CVV)
                            </Text.Label>
                            <Box sx={{
                                px: 2,
                            }}>
                                <FormCvvInput name={EFormFields.cvv} form={form}/>
                            </Box>
                        </Box>
                    </Box>

                </Box>
            </Box>
            <MButton.Submit
                type="submit"
                sx={{
                    marginTop: 4,
                    alignSelf: 'flex-end',
                    px: 6,
                }}>
                Save
            </MButton.Submit>
        </Box>
    );
};

