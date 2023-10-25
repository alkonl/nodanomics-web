import {MButton} from "../base";
import React from "react";
import {useToggle} from "../../hooks";
import {UpdateSpreadsheetParamsPopUp} from "./UpdateSpreadsheetParamsPopUp";

export const UpdateSpreadsheetParamsButton: React.FC<{
    spreadsheetId: string
}> = ({spreadsheetId}) => {
    const popup = useToggle()
    return (<>
        <UpdateSpreadsheetParamsPopUp
            spreadsheetId={spreadsheetId}
            onClose={popup.close}
            isShow={popup.isOpened}
        />
        <MButton.Submit onClick={popup.open}>
            Properties
        </MButton.Submit>
    </>)
}
