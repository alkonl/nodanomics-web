import React, {useEffect} from 'react';
import {validation} from "../../../utils";
import {z} from "zod";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Box, Typography} from "@mui/material";
import {EColor} from "../../../constant";
import {Text} from "../../base/Text";
import {FormText} from "../../base/FormInput";
import {MButton} from "../../base";

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
            [EFormFields.cardNumber]: '1234 1234 1234 1234',
            [EFormFields.cardHolderName]: 'John Doe',
            [EFormFields.expirationDate]: '12/22',
            [EFormFields.cvv]: '123',
        })
    }, [])


    return (
        <Box sx={{
            py: 4,
            px: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: 400,
        }}>
            <Typography sx={{
                fontWeight: 'bold',
                alignSelf: 'flex-start'
            }}>
                Add New Card
            </Typography>
            <Box sx={{
                marginTop: 2,
                padding: 1,
                display: 'flex',
                flexDirection: 'column',
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: EColor.black,
                width: 200,
            }}>
                <Box sx={{
                    width: 20,
                    height: 20,
                    marginTop: 4,
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: EColor.black,
                }}/>
                <Typography sx={{
                    fontSize: 14,
                    height: 16,
                }}>
                    {formValues.cardNumber}
                </Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                }}>
                    <Typography sx={{
                        fontSize: 14,
                        height: 16,
                    }}>
                        {formValues.cardHolderName}
                    </Typography>
                    <Typography sx={{
                        fontSize: 14,
                        height: 16,
                    }}>
                        {formValues.cvv.replace(/./g, ' * ')}
                    </Typography>
                </Box>
            </Box>
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
                            <FormText name={EFormFields.cardNumber} form={form}/>
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
                                <FormText name={EFormFields.expirationDate} form={form}/>
                            </Box>
                        </Box>
                        <Box>
                            <Text.Label>
                                Security Code (CVV)
                            </Text.Label>
                            <Box sx={{
                                px: 2,
                            }}>
                                <FormText name={EFormFields.cvv} form={form}/>
                            </Box>
                        </Box>
                    </Box>

                </Box>
            </Box>
            <MButton.Submit sx={{
                marginTop: 4,
                alignSelf: 'flex-end',
                px: 6,
            }}>
                Save
            </MButton.Submit>
        </Box>
    );
};

