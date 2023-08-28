import React from 'react';
import {Box} from "@mui/material";
import {Dialog} from "@headlessui/react";
import {BasePopUp} from "../../../popUp";
import {ExecutionGraphSetup} from "./ExecutionGraphSetup";

export const ExecutionGraphSetupPopUp: React.FC<{
    isShow: boolean;
    onClose: () => void;
}> = ({isShow, onClose}) => {
    return (
        <Dialog open={isShow} onClose={onClose}>
            <BasePopUp>
                <Dialog.Panel>
                    <Box sx={{
                        height: '50vh',
                        minWidth: {
                            xs: '95vw',
                            sm: '50vw',
                        },
                        padding: {
                            xs: '10px',
                            sm: '40px',
                        },
                        backgroundColor: 'white',
                        borderRadius: '8px',
                    }}>
                        <ExecutionGraphSetup/>
                    </Box>
                </Dialog.Panel>
            </BasePopUp>
        </Dialog>
    );
};
