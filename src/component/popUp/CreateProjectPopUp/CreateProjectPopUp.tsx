import React from 'react';
import {Dialog} from "@headlessui/react";
import {BasePopUp} from "../PopUp";
import {CreateProjectForm} from "../../form";
import {Box} from "@mui/material";
import {EColor} from "../../../constant";

export const CreateProjectPopUp: React.FC<{
    isShow: boolean;
    onClose: () => void;
}> = ({isShow, onClose}) => {
    return (
        <Dialog open={isShow} onClose={onClose}>
            <BasePopUp>
                <Dialog.Panel>
                    <Box sx={{
                        padding: 3,
                        backgroundColor: EColor.white
                    }}>
                        <CreateProjectForm onSuccess={onClose}/>
                    </Box>
                </Dialog.Panel>
            </BasePopUp>
        </Dialog>
    );
};
