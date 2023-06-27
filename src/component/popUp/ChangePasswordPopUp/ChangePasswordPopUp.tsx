import React from 'react';
import {BasePopUp} from "../PopUp";
import {Dialog} from "@headlessui/react";
import {ChangePasswordForm} from "../../form/ChangePasswordForm";

export const ChangePasswordPopUp: React.FC<{
    isShow: boolean;
    onClose: () => void;
}> = ({isShow, onClose}) => {
    return (
        <Dialog open={isShow} onClose={onClose}>
            <BasePopUp>
                <Dialog.Panel>
                    <ChangePasswordForm/>
                </Dialog.Panel>
            </BasePopUp>
        </Dialog>

    );
};
