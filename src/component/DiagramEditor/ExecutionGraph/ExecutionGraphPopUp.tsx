import React from 'react';
import {ExecutionGraph} from "./ExecutionGraph";
import {Dialog} from "@headlessui/react";
import {BasePopUp} from "../../popUp";

export const ExecutionGraphPopUp: React.FC<{
    isShow: boolean;
    onClose: () => void;
}> = ({isShow, onClose}) => {
    return (
        <Dialog open={isShow} onClose={onClose}>
            <BasePopUp>
                <Dialog.Panel style={{
                    width: '70%',
                    height: '80%',
                }}>
                    <ExecutionGraph/>
                </Dialog.Panel>
            </BasePopUp>
        </Dialog>
    );
};
