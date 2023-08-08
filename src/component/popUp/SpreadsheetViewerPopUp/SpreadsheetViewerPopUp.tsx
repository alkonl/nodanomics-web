import React from 'react';
import {SpreadsheetViewer} from "../../Spreadsheet";
import {Dialog} from "@headlessui/react";
import {BasePopUp} from "../PopUp";

export const SpreadsheetViewerPopUp: React.FC<{
    isShow: boolean;
    onClose: () => void;
}> = ({isShow, onClose}) => {
    return (
        <Dialog open={isShow} onClose={onClose}>
            <BasePopUp>
                <Dialog.Panel>
            <SpreadsheetViewer/>
                </Dialog.Panel>
            </BasePopUp>
        </Dialog>
    );
};

