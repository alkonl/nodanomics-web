import React from 'react';
import {Button, Typography} from "@mui/material";
import {EColor} from "../../../../../../constant";
import {ISpreadsheetInfo} from "../../../../../../interface";
import {SpreadsheetViewerPopUp} from "../../../../../popUp";
import {useToggle} from "../../../../../../hooks";

export const SpreadsheetPreviewButton: React.FC<{
    spreadsheet: ISpreadsheetInfo;
}> = ({spreadsheet}) => {
    const spreadsheetViewerPopUpManager = useToggle();
    return (
        <>
            <SpreadsheetViewerPopUp
            isShow={spreadsheetViewerPopUpManager.isOpened}
            onClose={spreadsheetViewerPopUpManager.close}
            spreadsheetId={spreadsheet.id}
            />
            <Button
                onClick={spreadsheetViewerPopUpManager.open}
                sx={{
                    width: '100%',
                    borderBottomColor: EColor.lightMarine2,
                    borderBottomWidth: 2,
                    borderBottomStyle: 'solid',
                    paddingBottom: 0.5,
                }}>
                <Typography sx={{
                    fontWeight: 'bold',
                    color: EColor.grey2,
                }}>
                    {spreadsheet.name}
                </Typography>
            </Button>
        </>

    );
};
