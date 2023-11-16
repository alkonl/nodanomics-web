import React, {ChangeEvent, useEffect, useState} from 'react';
import {Dialog} from "@headlessui/react";
import {MButton, ParameterInputForm} from "../base";
import {BasePopUp, UploadSpreadSheetPopUp} from "../popUp";
import {Box, Typography} from "@mui/material";
import {EColor, EFontColor} from "../../constant";
import {useGetSpreadSheetQuery, useUpdateSpreadsheetParamsMutation} from "../../api";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useToggle} from "../../hooks";


enum EFormFields {
    name = 'name',
}

const validationSchema = z.object({
    [EFormFields.name]: z.string(),
})

type IValidationSchema = z.infer<typeof validationSchema>;

export const UpdateSpreadsheetParamsPopUp: React.FC<{
    isShow: boolean;
    onClose: () => void;
    spreadsheetId: string
}> = ({isShow, onClose, spreadsheetId}) => {
    const uploadSpreadSheetPopUpManager = useToggle();
    const {data: spreadsheet} = useGetSpreadSheetQuery({
        spreadsheetId,
    })
    const [updateSpreadsheetParams] = useUpdateSpreadsheetParamsMutation()

    const form = useForm<IValidationSchema>({
        resolver: zodResolver(validationSchema)
    })

    useEffect(() => {
        if (spreadsheet) {
            form.reset({
                [EFormFields.name]: spreadsheet.name,
            })
        }
    }, [spreadsheet])

    const onSubmit = (formData: IValidationSchema) => {
        updateSpreadsheetParams({
            spreadsheetId,
            name: formData[EFormFields.name],
        })
    }




    return (
        <>

        <Dialog open={isShow} onClose={onClose}>
            <UploadSpreadSheetPopUp
                type="rewriteSpreadsheet"
                spreadsheetId={spreadsheetId}
                onClose={uploadSpreadSheetPopUpManager.close}
                isShow={uploadSpreadSheetPopUpManager.isOpened}
            />
            <BasePopUp>
                <Dialog.Panel>
                    <Box
                        onSubmit={(e) => {
                            e.preventDefault();
                            form.handleSubmit(onSubmit)();
                        }}
                        sx={{
                            padding: 2,
                            backgroundColor: EColor.darkMarine2,
                            display: 'flex',
                            gap: 2,
                            flexDirection: 'column',
                        }}
                        component="form"
                    >
                        <Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1,
                                    justifyContent: 'center',
                                }}
                            >

                                <MButton.Submit
                                    onClick={uploadSpreadSheetPopUpManager.open}
                                   >Change spreadsheet</MButton.Submit>

                            </Box>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            gap: 1,
                            flexDirection: 'column',
                        }}>
                            <Typography sx={{
                                color: EColor.white,
                                fontSize: 18,
                                fontWeight: 600,
                            }}>
                                Properties
                            </Typography>
                            <Box>
                                <Typography sx={{
                                    color: EColor.lightMarine,
                                    fontSize: 16,
                                }}>
                                    name:
                                </Typography>
                                <ParameterInputForm form={form} name={EFormFields.name}/>
                            </Box>
                        </Box>

                        <MButton.Submit type="submit">
                            Save
                        </MButton.Submit>
                    </Box>
                </Dialog.Panel>
            </BasePopUp>
        </Dialog>
        </>
    );
};

