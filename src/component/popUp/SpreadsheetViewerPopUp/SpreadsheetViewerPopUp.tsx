import React from 'react';
import {SpreadsheetViewer} from "../../Spreadsheet";
import {Dialog} from "@headlessui/react";
import {BasePopUp} from "../PopUp";

export const SpreadsheetViewerPopUp: React.FC<{
    isShow: boolean;
    onClose: () => void;
    spreadsheetId: string;
}> = ({isShow, onClose,spreadsheetId}) => {
    return (
        <Dialog open={isShow} onClose={onClose}>
            <BasePopUp>
                <Dialog.Panel>
                    <SpreadsheetViewer
                        spreadsheetId={spreadsheetId}
                        onDelete={onClose}
                    />
                </Dialog.Panel>
            </BasePopUp>
        </Dialog>
    );
};

