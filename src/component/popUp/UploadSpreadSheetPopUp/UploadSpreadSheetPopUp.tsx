import React from 'react';
import {Dialog} from "@headlessui/react";
import {BasePopUp} from "../PopUp";
import {Box} from "@mui/material";
import {UploadSpreadsheetForm} from "../../form";

export const UploadSpreadSheetPopUp: React.FC<{
    isShow: boolean;
    onClose: () => void;
    projectId: string;
}> = ({onClose, isShow, projectId}) => {

    return (
        <Dialog open={isShow} onClose={onClose}>
            <BasePopUp>
                <Dialog.Panel>
                    <Box sx={{
                        padding: '40px',
                        backgroundColor: 'white',
                        borderRadius: 8,
                    }}>
                        <UploadSpreadsheetForm
                            projectId={projectId}
                        />
                    </Box>
                </Dialog.Panel>
            </BasePopUp>
        </Dialog>
    );
};
