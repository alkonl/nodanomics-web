import React from 'react';
import {Dialog} from "@headlessui/react";
import {BasePopUp} from "../PopUp";
import {DiagramManagerFormDeprecated, EDiagramManagerType} from "../../form";
import {Box} from "@mui/material";

export const DiagramManagerPopUp: React.FC<{
    isShow: boolean;
    onClose: () => void;
    type: EDiagramManagerType
}> = ({isShow, onClose, type}) => {
    return (
        <Dialog open={isShow} onClose={onClose}>
            <BasePopUp>
                <Dialog.Panel>
                    <Box sx={{
                        padding: '40px',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                    }}>
                    <DiagramManagerFormDeprecated type={type} onSave={onClose}/>
                    </Box>
                </Dialog.Panel>
            </BasePopUp>
        </Dialog>
    );
};
