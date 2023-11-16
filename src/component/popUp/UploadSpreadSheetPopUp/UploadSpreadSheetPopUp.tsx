import React from 'react';
import {Dialog} from "@headlessui/react";
import {BasePopUp} from "../PopUp";
import {Box} from "@mui/material";
import {UploadSpreadsheetForm, UploadSpreadsheetFormProps} from "../../form";
import {EColor} from "../../../constant";
import {SpreadsheetAction} from "../../../interface";



export const UploadSpreadSheetPopUp: React.FC<{
    isShow: boolean;
    onClose: () => void;
} & SpreadsheetAction> = ({onClose, isShow, ...params}) => {

    return (
        <Dialog open={isShow} onClose={onClose}>
            <BasePopUp>
                <Dialog.Panel>
                    <Box sx={{
                        padding: '40px',
                        borderRadius: 8,
                        backgroundColor: EColor.darkMarineLight,
                    }}>
                        <UploadSpreadsheetForm
                            onSuccessLogin={onClose}
                            {...params}
                        />
                    </Box>
                </Dialog.Panel>
            </BasePopUp>
        </Dialog>
    );
};
