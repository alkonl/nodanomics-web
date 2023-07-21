import React from 'react';
import {Dialog} from "@headlessui/react";
import {BasePopUp} from "../PopUp";
import {ManageTeamMembers} from "../../Team";

export const ManageUserPopUp: React.FC<{
    isShow: boolean;
    onClose: () => void;
    projectId: string;
}> = ({isShow, onClose, projectId}) => {
    return (
        <Dialog open={isShow} onClose={onClose}>
            <BasePopUp>
                <Dialog.Panel>
                    <ManageTeamMembers projectId={projectId}/>
                </Dialog.Panel>
            </BasePopUp>
        </Dialog>
    );
};

