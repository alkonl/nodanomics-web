import React from 'react';
import {Dialog} from "@headlessui/react";
import {BasePopUp} from "../PopUp";
import {DiagramManagerFormDeprecated, EDiagramManagerType} from "../../form";

export const DiagramManagerPopUp: React.FC<{
    isShow: boolean;
    onClose: () => void;
    type: EDiagramManagerType
}> = ({isShow, onClose, type}) => {
    return (
        <Dialog open={isShow} onClose={onClose}>
            <BasePopUp>
                <Dialog.Panel>
                    <div style={{
                        padding: '40px',
                        backgroundColor: 'white',
                        borderRadius: 8,
                    }}>
                    <DiagramManagerFormDeprecated type={type} onSave={onClose}/>
                    </div>
                </Dialog.Panel>
            </BasePopUp>
        </Dialog>
    );
};
