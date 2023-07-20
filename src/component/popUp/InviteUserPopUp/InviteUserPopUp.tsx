import React from 'react';
import {BasePopUp} from "../PopUp";
import {Dialog} from "@headlessui/react";
import {InviteUserForm} from "../../form";

export const InviteUserPopUp: React.FC<{
    isShow: boolean;
    onClose: () => void;
    projectId: string;
}> = ({isShow, onClose, projectId}) => {
    return (
        <Dialog open={isShow} onClose={onClose}>
            <BasePopUp>
                <Dialog.Panel>
                    <InviteUserForm projectId={projectId} close={onClose} />
                </Dialog.Panel>
            </BasePopUp>
        </Dialog>
    );
};
