import React from 'react';
import {Box, Typography} from "@mui/material";
import {EColor} from "../../constant";
import {formatCardNumber} from "../../utils";

export const BankCard: React.FC<{
    cardNumber?: string,
    cardHolderName?: string,
    expireDate?: string,
}> = ({
          cardNumber, cardHolderName, expireDate
      }) => {

    const formattedCardNumber = cardNumber ? formatCardNumber(cardNumber) : '';

    return (
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
                {formattedCardNumber}
            </Typography>
            <Typography sx={{
                marginLeft: 6,
            }}>
                {expireDate}
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
                    {cardHolderName}
                </Typography>
                <Box sx={{
                    width: 40,
                    height: 20,
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: EColor.black,
                }}/>

            </Box>
        </Box>
    );
};
