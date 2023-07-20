import React from 'react';
import {Dialog} from "@headlessui/react";
import {BasePopUp} from "../PopUp";
import {ManageTeamMembers} from "../../Team";

export const ManageUserPopUp: React.FC<{
    isShow: boolean;
    onClose: () => void;
}> = ({isShow, onClose}) => {
    return (
        <Dialog open={isShow} onClose={onClose}>
            <BasePopUp>
                <Dialog.Panel>
                    <ManageTeamMembers/>
                </Dialog.Panel>
            </BasePopUp>
        </Dialog>
    );
};

